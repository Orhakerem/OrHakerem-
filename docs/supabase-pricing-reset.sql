-- Pricing reset for the Penthouse and Studio listings.
-- Run this in the Supabase SQL editor for the Or Hakerem project.
-- Last revised 2026-08-31; reflects the grid currently live in production.
--
-- Pricing model: a single flat nightly rate per listing (no weekend or season
-- surcharge), with ONE open-ended duration discount applied on top by
-- src/lib/pricing-adjustments.ts:
--
--   Listing (id)          Nightly    7+ nights (no upper bound)
--   Luxury Penthouse       2300 ILS   -10% -> 2070 ILS
--   (penthouse)
--   Spacious & Cosy Apt     500 ILS   -12% ->  440 ILS
--   (studio)
--
-- WHY ONE DISCOUNT TIER AND NOT TWO
--
-- An earlier revision of this script had a second, deeper "monthly" tier
-- (28+ nights: -18% penthouse, -15% studio) stacked above a 7-27 night
-- "weekly" tier. That shape is a trap, because the weekly tier's upper bound
-- makes the total jump discontinuously at the boundary:
--
--   * Penthouse -10%/-18%, at the 2500 nightly rate in force at the time:
--     27 nights cost 60750, but 28 nights cost 57400. Adding a night made the
--     stay 3350 ILS CHEAPER, so nobody had any reason to book 25-27 nights.
--   * Studio -12%/-15%: 27 nights cost 11880, 28 nights cost 11900 — a 20 ILS
--     step for a whole extra night.
--
-- The two failure modes are the same bug seen from either side. With a capped
-- weekly tier at rate w and a monthly tier at rate m, night 28 only prices
-- sanely when 28*m is just above 27*w — a knife edge (the studio's -15% was
-- within 0.1pt of it). Dropping the cap and keeping a single rate removes the
-- boundary entirely: every extra night costs exactly one night.
--
-- If long stays should be cheaper, lower the single rate below. Do NOT
-- reintroduce a second tier on top of a capped one.
--
-- Requires the src/lib/pricing-engine.ts fix that filters pricing_tiers on
-- is_active = true (merged to main in PR #36). Without that fix, the `delete`
-- below is still correct, but deactivating a tier from /admin/pricing
-- afterwards would silently keep charging the old rate.
--
-- Equivalent manual steps in /admin/pricing (no SQL access required):
--   1. Listing price matrix -> set "Base price" to 2300 (Penthouse) /
--      500 (Studio). Keep exactly 6 tier rows per listing (Current/Low/High
--      x Weekday/Weekend), each with Min nights = 1, Max nights empty,
--      Nightly price = 2300 / 500, Active checked. Save.
--   2. Pricing adjustment rules -> remove every existing "duration" rule for
--      these listings, then add the 2 rules inserted below, each with
--      Min nights = 7 and Max nights EMPTY (basis points: -1000 = -10%,
--      -1200 = -12%).
--   3. Confirm with the pricing simulator on the same page.
--
-- NOTE: "last_minute" / "early_booking" rules are NOT touched by this script.
-- Adjustments of different rule types stack additively (see
-- applyPricingAdjustments in src/lib/pricing-adjustments.ts), so an active
-- last-minute discount would combine with the duration discount below. There
-- were none on these two listings as of 2026-08-29; the verification query at
-- the end re-checks this.

begin;

-- 1. Flat nightly base price. This column is DISPLAY ONLY: getPricingBreakdown
--    selects just (id, cleaning_fee, currency) from listings, so what guests
--    are actually charged comes from pricing_tiers.target_price in step 2.
--    Changing a rate here alone looks applied and bills the old price —
--    always change both, and keep them equal.
update public.listings set base_price = 2300 where id = 'penthouse';
update public.listings set base_price = 500  where id = 'studio';

-- 2. Replace the pricing tier grid with a single open-ended tier per
--    season/day-type combination, at the flat nightly rate. Deleting (not
--    deactivating) avoids leaving old, more-specific tiers around that
--    would otherwise win over the new one.
delete from public.pricing_tiers where listing_id in ('penthouse', 'studio');

insert into public.pricing_tiers
  (listing_id, season_type, day_type, min_nights, max_nights, target_price, is_active, priority)
values
  ('penthouse', 'current', 'weekday', 1, null, 2300, true, 0),
  ('penthouse', 'current', 'weekend', 1, null, 2300, true, 0),
  ('penthouse', 'low',     'weekday', 1, null, 2300, true, 0),
  ('penthouse', 'low',     'weekend', 1, null, 2300, true, 0),
  ('penthouse', 'high',    'weekday', 1, null, 2300, true, 0),
  ('penthouse', 'high',    'weekend', 1, null, 2300, true, 0),
  ('studio',    'current', 'weekday', 1, null, 500,  true, 0),
  ('studio',    'current', 'weekend', 1, null, 500,  true, 0),
  ('studio',    'low',     'weekday', 1, null, 500,  true, 0),
  ('studio',    'low',     'weekend', 1, null, 500,  true, 0),
  ('studio',    'high',    'weekday', 1, null, 500,  true, 0),
  ('studio',    'high',    'weekend', 1, null, 500,  true, 0);

-- 3. Replace the duration discount rules for these two listings. Every
--    duration rule is removed first: selectPricingAdjustmentRules keeps only
--    one rule per rule_type per night, and when two duration rules match the
--    same night the tie is broken on a UUID comparison — i.e. arbitrarily.
--    Never leave two overlapping duration rules on one listing.
--
--    The delete covers the superseded 2026-08-26 rule names as well, so this
--    script is safe to re-run over either revision of the grid.
delete from public.pricing_adjustment_rules
where listing_id in ('penthouse', 'studio')
  and rule_type = 'duration';

insert into public.pricing_adjustment_rules
  (listing_id, name, rule_type, is_active, priority, adjustment_basis_points, min_nights, max_nights)
values
  ('penthouse', 'Penthouse long-stay discount (7+ nights)', 'duration', true, 0, -1000, 7, null),
  ('studio',    'Studio long-stay discount (7+ nights)',    'duration', true, 0, -1200, 7, null);

commit;

-- Verification (run separately, after commit):
--
-- select id, base_price from public.listings where id in ('penthouse', 'studio');
--   -> penthouse 2300, studio 500
--
-- select listing_id, season_type, day_type, min_nights, max_nights, target_price, is_active
-- from public.pricing_tiers
-- where listing_id in ('penthouse', 'studio')
-- order by listing_id, season_type, day_type;
--   -> 12 rows, all is_active = true, min_nights 1, max_nights null
--
-- select listing_id, name, rule_type, is_active, adjustment_basis_points, min_nights, max_nights
-- from public.pricing_adjustment_rules
-- order by listing_id, rule_type, min_nights;
--   -> exactly 2 rows, both rule_type 'duration', both max_nights null.
--      Any extra row with rule_type in ('last_minute', 'early_booking') and
--      is_active = true stacks additively with the duration discount.
--      Any SECOND active 'duration' row on the same listing is a bug (see
--      step 3) — the engine would pick between them arbitrarily.
--
-- End-to-end check against the public pricing API (no auth required):
--
--   curl -s -X POST https://www.orhakerem.com/api/calculate-price \
--     -H 'Content-Type: application/json' \
--     -d '{"listing_id":"penthouse","check_in":"2026-10-05","check_out":"2026-11-04"}'
--
-- Expected night_total (excludes the cleaning fee):
--
--   penthouse   2 nights ->  4600     studio   2 nights ->  1000
--   penthouse   7 nights -> 14490     studio   7 nights ->  3080
--   penthouse  27 nights -> 55890     studio  27 nights -> 11880
--   penthouse  28 nights -> 57960     studio  28 nights -> 12320
--   penthouse  30 nights -> 62100     studio  30 nights -> 13200
