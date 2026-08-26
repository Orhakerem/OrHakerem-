-- Pricing reset for the Penthouse and Studio listings (2026-08-26).
-- Run this in the Supabase SQL editor for the Or Hakerem project.
--
-- New pricing model: a single flat nightly rate per listing (no more
-- weekend/season surcharges), with duration discounts applied on top by
-- src/lib/pricing-adjustments.ts:
--
--   Listing (id)          Nightly    Weekly (7-27 nights)   Monthly (28+ nights)
--   Luxury Penthouse       2500 ILS   -10% -> 2250 ILS       -18% -> 2050 ILS
--   (penthouse)
--   Spacious & Cosy Apt     500 ILS   -12% ->  440 ILS       -15% ->  425 ILS
--   (studio)
--
-- Requires the src/lib/pricing-engine.ts fix that filters pricing_tiers on
-- is_active = true (shipped alongside this script). Without that fix, the
-- `delete` below is still correct, but deactivating a tier from
-- /admin/pricing afterwards would silently keep charging the old rate.
--
-- Equivalent manual steps in /admin/pricing (no SQL access required):
--   1. Listing price matrix -> set "Base price" to 2500 (Penthouse) /
--      500 (Studio). Keep exactly 6 tier rows per listing (Current/Low/High
--      x Weekday/Weekend), each with Min nights = 1, Max nights empty,
--      Nightly price = 2500 / 500, Active checked. Save.
--   2. Pricing adjustment rules -> deactivate existing "duration" rules for
--      these listings, then add the 4 rules inserted below (basis points:
--      -1000 = -10%, -1800 = -18%, -1200 = -12%, -1500 = -15%).
--   3. Confirm with the pricing simulator on the same page.
--
-- NOTE: existing "last_minute" / "early_booking" rules for these listings
-- are NOT touched by this script. Adjustments of different rule types
-- stack additively (src/lib/pricing-adjustments.ts applyPricingAdjustments),
-- so an active last-minute discount will combine with the new weekly/
-- monthly discount. Check the verification query at the end and let us
-- know if those rules should be revisited too.

begin;

-- 1. Flat nightly base price (display only in /admin/pricing today; the
--    engine prices off pricing_tiers.target_price, updated below).
update public.listings set base_price = 2500 where id = 'penthouse';
update public.listings set base_price = 500  where id = 'studio';

-- 2. Replace the pricing tier grid with a single open-ended tier per
--    season/day-type combination, at the flat nightly rate. Deleting (not
--    deactivating) avoids leaving old, more-specific tiers around that
--    would otherwise win over the new one (see note above).
delete from public.pricing_tiers where listing_id in ('penthouse', 'studio');

insert into public.pricing_tiers
  (listing_id, season_type, day_type, min_nights, max_nights, target_price, is_active, priority)
values
  ('penthouse', 'current', 'weekday', 1, null, 2500, true, 0),
  ('penthouse', 'current', 'weekend', 1, null, 2500, true, 0),
  ('penthouse', 'low',     'weekday', 1, null, 2500, true, 0),
  ('penthouse', 'low',     'weekend', 1, null, 2500, true, 0),
  ('penthouse', 'high',    'weekday', 1, null, 2500, true, 0),
  ('penthouse', 'high',    'weekend', 1, null, 2500, true, 0),
  ('studio',    'current', 'weekday', 1, null, 500,  true, 0),
  ('studio',    'current', 'weekend', 1, null, 500,  true, 0),
  ('studio',    'low',     'weekday', 1, null, 500,  true, 0),
  ('studio',    'low',     'weekend', 1, null, 500,  true, 0),
  ('studio',    'high',    'weekday', 1, null, 500,  true, 0),
  ('studio',    'high',    'weekend', 1, null, 500,  true, 0);

-- 3. Replace the duration-based discount rules for these two listings.
--    Deactivate any existing "duration" rule first: selectPricingAdjustmentRules
--    only keeps one rule per rule_type per night, so a stale duration rule
--    would otherwise compete with the new ones.
update public.pricing_adjustment_rules
set is_active = false
where listing_id in ('penthouse', 'studio')
  and rule_type = 'duration';

delete from public.pricing_adjustment_rules
where listing_id in ('penthouse', 'studio')
  and name in (
    'Penthouse weekly discount',
    'Penthouse monthly discount',
    'Studio weekly discount',
    'Studio monthly discount'
  );

insert into public.pricing_adjustment_rules
  (listing_id, name, rule_type, is_active, priority, adjustment_basis_points, min_nights, max_nights)
values
  ('penthouse', 'Penthouse weekly discount',  'duration', true, 0, -1000, 7,  27),
  ('penthouse', 'Penthouse monthly discount', 'duration', true, 0, -1800, 28, null),
  ('studio',    'Studio weekly discount',     'duration', true, 0, -1200, 7,  27),
  ('studio',    'Studio monthly discount',    'duration', true, 0, -1500, 28, null);

commit;

-- Verification (run separately, after commit):
--
-- select id, base_price from public.listings where id in ('penthouse', 'studio');
--
-- select listing_id, season_type, day_type, min_nights, max_nights, target_price, is_active
-- from public.pricing_tiers
-- where listing_id in ('penthouse', 'studio')
-- order by listing_id, season_type, day_type;
--
-- select listing_id, name, rule_type, is_active, adjustment_basis_points, min_nights, max_nights
-- from public.pricing_adjustment_rules
-- where listing_id in ('penthouse', 'studio')
-- order by listing_id, rule_type, min_nights;
--
-- Any row above with rule_type in ('last_minute', 'early_booking') and
-- is_active = true will stack additively with the new duration discounts.
