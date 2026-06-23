# Or Hakerem — SEO Audit & Keyword Strategy

**Date:** 2026-06-23
**Source:** Google Search Console (property `sc-domain:orhakerem.com`), last 12 months.
**Focus:** keyword strategy & research, with approved technical quick-wins.

---

## 1. The data snapshot (last 12 months)

| Metric | Value |
| --- | --- |
| Total clicks | **132** |
| Total impressions | **3,530** |
| Average CTR | **3.7%** |
| Average position | **13.9** |
| Pages indexed / not indexed | 23 / 11 |
| Core Web Vitals (GSC) | "No data" (insufficient field traffic) |

**By country:**

| Country | Clicks | Impressions | CTR | Read |
| --- | --- | --- | --- | --- |
| Israel | 70 | 958 | 7.3% | Brand + local; converts well |
| France | 29 | 110 | **26%** | Small but loyal francophone audience (founder is French) |
| United States | 14 | **1,391** | **~1%** | Huge visibility, almost no clicks — the informational cluster |
| India | 6 | 186 | 3% | Low intent |

**Top pages:** homepage (split across non-www 86 clk / www 33 clk), `/events` (630 impr combined), `/faq` (258 impr), legacy `/concierge-services` (246 impr, 301s to `/services`), and the Shabbat / neighborhood / things-to-do blog posts.

---

## 2. The core strategic finding

**The site is visible to people *researching the neighborhood*, and nearly invisible to people *ready to book*.**

- A single informational cluster — *"how far is Kerem HaTeimanim from the beach"* — pulls **~450+ impressions/year with ~0 clicks.** Google ranks the site for the curiosity, but no page answered the question directly or invited a click.
- The commercial money-term **`luxury apartments tel aviv` got 1 impression** all year. The site does not yet compete for high-intent booking queries.
- The US accounts for 1,391 impressions at ~1% CTR — almost entirely this unclicked informational demand.

The strategy is therefore two-pronged: **(a) capture and convert the informational demand** that already exists, and **(b) build presence on commercial terms.**

---

## 3. Keyword clusters → action map

| Cluster (representative queries) | ~Impr/yr | Clicks | Target page | Action taken |
| --- | --- | --- | --- | --- |
| **Distance to beach** — `kerem hateimanim distance to beach tel aviv` (142), `…walking distance to beach…` (119), `banana beach distance from kerem hateimanim` | **450+** | ~0 | **New blog post** | ✅ Created `how-far-is-kerem-hateimanim-from-the-beach` (direct-answer + walk-time table + CTAs to properties) |
| **Brand** — `hakerem` (131), `hakerem luxury apartments` (123), `kerem hateimanim` (58), misspellings | 350+ | 2 | Home / properties | Home title already leads with brand; monitor — mostly an SERP-CTR / ranking-position issue |
| **Concierge** — `concierge services tel aviv` (37), `concierge tlv`, `concierge tel aviv` | ~55 | 0 | `/services` | ✅ Strengthened title/keywords; legacy `/concierge-services` (246 impr) 301s here correctly |
| **Best time / weather** — `best time to visit tel aviv` (24), `when to go to tel aviv`, `is tel aviv humid` | ~30 | 0 | `best-time-to-visit` post | ✅ Added query variants to frontmatter |
| **Events / venue** — `luxury venue israel` (15), `event space tel aviv` | ~25 | 0 | `/events` | ✅ Added `luxury venue Israel`, `event space Tel Aviv` to keywords |
| **Long-stay / remote work** — `long stay apartments near tel aviv beach for remote work` (18), `extended stay with kitchen israel` | ~25 | 0 | `long-term-monthly-stays` post | ✅ Added the long-tail variants to frontmatter |
| **Shabbat (city/transit)** — `how to get from jerusalem to tel aviv on shabbat`, `tel aviv on shabbat`, `eruv tel aviv`, `what to do in tel aviv on shabbat` | ~15 | 0 | **New blog post** | ✅ Created `tel-aviv-on-shabbat-what-is-open-getting-around` (distinct from the existing accommodation post; cross-linked) |
| **Yemenite quarter** — `yemenite quarter tel aviv`, `kerem hateimanim neighborhood tel aviv` | ~12 | 0 | neighborhood guide | ✅ Added variant to frontmatter |
| **Commercial booking** — `luxury apartments tel aviv`, `short term rental tel aviv`, `vacation rental tel aviv` | ~3 | 0 | Home + property pages | ✅ Added to root + property keywords/description (content-led ranking needs the new beach post + links to mature) |
| **Surfing (untapped)** — `surfing near kerem hateimanim`, `best time to surf tel aviv` | ~5 | 0 | — | Recommended future post (see §6) |

---

## 4. What was implemented this round

**New content (new pages — per house rule, new visible content lives only in new pages):**
1. `content/blog/how-far-is-kerem-hateimanim-from-the-beach.mdx` — answers the #1 impression cluster, with a walking-distance table and clear routing to `/properties`, the penthouse, and the studio.
2. `content/blog/tel-aviv-on-shabbat-what-is-open-getting-around.mdx` — captures the Shabbat city/transit intent (distinct from the existing Shabbat *accommodation* post), cross-linked into the Jewish-travel cluster.

Both auto-flow into `sitemap.xml` (via `getAllPosts()`) and receive BlogPosting + BreadcrumbList schema automatically.

**Existing-page tag optimization (titles / meta / keywords only — no new visible sections):**
- `src/app/layout.tsx` — added `short-term rental Tel Aviv`, `vacation rental Tel Aviv`; description now mentions short-term rental.
- `src/app/services/layout.tsx` — concierge cluster variants.
- `src/app/events/layout.tsx` — `luxury venue Israel`, `event space Tel Aviv`.
- `src/lib/property-seo.ts` — commercial rental terms on both properties.
- Frontmatter tweaks: `best-time-to-visit`, `long-term-monthly-stays`, `kerem-hateimanim-neighborhood-guide`.

**Technical quick-wins:**
- **Duplicate files removed** — 27 stray `… 2.{jpg,tsx,ts}` copies (Finder/iCloud duplicates) deleted. Verified each was byte-identical to its sibling first; `chaises_hautes_angle 2.JPG` was **kept** (it's a genuine second photo, not a dup).
- **www vs non-www verified** — the permanent redirect chain works on the live site: `http://orhakerem.com` → `https://orhakerem.com` → `https://www.orhakerem.com` (200). The split seen in GSC is legacy index data that will consolidate now that the 308 + www canonicals are live. **No code change needed.**
- **Images optimized** — `scripts/optimize-images.mjs` resized 51 oversized source images (many were 8064×4536 / 8K) to web-appropriate dimensions (galleries ≤2560px, blog ≤1920px), JPEG q82/mozjpeg, PNG lossless. **`public/` images: 121.7MB → 20.0MB (−101.7MB)**, no visible quality change at display sizes. Videos (`hero.mp4` 1.5MB, `events-video.mp4` 5.2MB 1080p) were already reasonable and left untouched.

---

## 5. Post-launch actions (for Joseph, in GSC after deploy)

1. Resubmit `sitemap.xml`.
2. URL Inspection → **Request indexing** for the two new posts:
   - `/blog/how-far-is-kerem-hateimanim-from-the-beach`
   - `/blog/tel-aviv-on-shabbat-what-is-open-getting-around`
3. Over 4–6 weeks, watch CTR/position on the "distance to beach" cluster and `/services`, `/events`.
4. If the homepage www/non-www split is still visible in 6–8 weeks, it's only cosmetic in the domain property — no action required.

---

## 6. Recommendations (not built — your call)

- **French-language version of the site.** France converts at **26% CTR** off tiny volume. The site is English-only; a French locale (or at least French landing pages for the properties) is likely the single highest-ROI growth lever, but it's a full i18n project — worth scoping separately.
- **Commercial landing pages** for `luxury apartments tel aviv` / `short-term rental tel aviv` (you chose blog-only for new content this round). Tags help, but ranking these terms ultimately needs dedicated, content-rich pages.
- **Surfing post** — small but completely untapped, on-brand cluster (`surfing near kerem hateimanim`, `best time to surf tel aviv`), and naturally links to the beach-proximity story.
- **Internal links** — as the blog grows, keep routing informational posts to the property pages (already done in the two new posts).
