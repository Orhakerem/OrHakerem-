# Audit SEO complet — Or Hakerem

**Date :** 9 août 2026
**Périmètre :** orhakerem.com (EN/FR/HE) — technique, contenu, données, schema, off-page
**Sources :** Google Search Console (`sc-domain:orhakerem.com`, fenêtre 16 mois), Google Analytics 4 (propriété `521216501`), Lighthouse local (8 URLs × mobile/desktop), inspection du code et du HTML live
**Audit précédent :** `SEO-AUDIT.md` (23 juin 2026)

---

## 0. Verdict en une page

**Le site n'a pas un problème technique. Il a un problème de profondeur de contenu commercial — et trois bugs qui saignent.**

La qualité technique est réellement bonne : Lighthouse 100/100 desktop, score SEO 100 partout, CLS ≈ 0, hreflang correct (meilleur que **tous** les concurrents directs mesurés). L'investissement i18n de juillet fonctionne : `/fr` et `/he` sont **les deux meilleures pages du site**.

Mais :

1. **Le sélecteur de langue est cassé sur 10 des 14 pages anglaises** — un visiteur anglophone qui clique « FR » tombe sur un 404. C'est le marché qui convertit le mieux (18,9 % de CTR).
2. **`robots.txt` empêche Googlebot de charger le CSS et les polices du site.**
3. **GA4 ne mesure aucune conversion.** 740 événements, zéro événement clé lié à une réservation ou un contact. Le ROI du SEO est aujourd'hui non mesurable.

Et stratégiquement : les pages commerciales font **402 à 545 mots** là où les concurrents qui occupent le SERP en font **1 100 à 2 200**. C'est le vrai goulot d'étranglement.

### Les chiffres

| Métrique | Juin 2026 (12 mois) | **Août 2026 (16 mois)** | Lecture |
|---|---|---|---|
| Clics | 132 | **210** | Croissance réelle |
| Impressions | 3 530 | **6 470** | +83 % |
| CTR moyen | 3,7 % | 3,2 % | Baisse mécanique (plus d'impressions info) |
| Position moyenne | 13,9 | 13,7 | **Stable — le vrai problème** |
| Pages indexées | 23 | **63** | 8 → 63 depuis le 1er juin |
| Pages non indexées | 11 | 29 | Détail analysé en §1 |
| Vidéos indexées | — | **0 / 7** | Aucun `VideoObject` |
| Core Web Vitals | Aucune donnée | Aucune donnée | Trafic terrain insuffisant |

---

## 1. Indexation — diagnostic des 29 pages non indexées

J'ai extrait les URLs réelles derrière chaque motif. **Deux des trois motifs sont de vrais problèmes ; un est un faux positif.**

| Motif | Pages | Validation GSC | Verdict |
|---|---|---|---|
| Page avec redirection | 8 | **Échec** | ✅ **Bénin — aucune action** |
| Introuvable (404) | 6 | Non commencé | 🔴 **Bug réel — P0** |
| Bloquée par robots.txt | 4 | Non commencé | 🔴 **Problème réel — P0** |
| Explorée, non indexée | 3 | Commencé | 🟡 Normal (pages faibles) |
| Détectée, non indexée | 8 | Réussi | 🟡 Normal (budget crawl) |

### 1.1 « Page avec redirection » (8) — faux positif, ne rien faire

Les 8 URLs : `http://orhakerem.com/`, `https://orhakerem.com/`, `http://www.orhakerem.com/`, `https://orhakerem.com/concierge-services`, `https://www.orhakerem.com/concierge-services`, `https://orhakerem.com/privacy`, `https://orhakerem.com/cancellation`, `https://orhakerem.com/faq`.

Ce sont **exactement** les redirections voulues : apex → www, http → https, et l'ancien `/concierge-services` → `/services`. Dans une propriété de type domaine, GSC les liste en permanence et la « validation » échouera toujours, puisqu'elles redirigent — c'est leur rôle.

> **Action : aucune.** Ne pas relancer de validation, ne rien « corriger ». C'est une lecture erronée classique de GSC.

### 1.2 « Introuvable (404) » (6) — P0, bug du sélecteur de langue

Les 6 URLs : `/fr/en/terms`, `/he/en/terms`, `/he/en`, `/fr/en`, `/fr/en/faq`, `/react-text`.

**Cause racine identifiée et reproduite.** Deux mécanismes se combinent :

1. `stripLocalePrefix()` dans `src/i18n/config.ts:52-60` ignore volontairement la locale par défaut (`if (locale === DEFAULT_LOCALE) continue;`). Elle ne retire donc **jamais** un préfixe `/en`.
2. Les rewrites de `next.config.mjs:90-115` mappent `/terms` → `/en/terms` en interne. Sur les pages **prérendues statiquement**, `usePathname()` renvoie ce chemin interne `/en/terms`.

`LocaleSwitcher` (`src/i18n/LocaleSwitcher.tsx`) fait alors :
`stripLocalePrefix('/en/terms')` → `/en/terms` (inchangé) → `localizePath('fr', '/en/terms')` → **`/fr/en/terms`** → 404.

**Vérifié en direct sur le site (9 août 2026) :**

```
BROKEN  /                                        -> /fr/en          /he/en
BROKEN  /about                                   -> /fr/en/about    /he/en/about
ok      /properties
BROKEN  /services                                -> /fr/en/services /he/en/services
ok      /events
ok      /reservation
BROKEN  /blog                                    -> /fr/en/blog     /he/en/blog
BROKEN  /faq                                     -> /fr/en/faq      /he/en/faq
BROKEN  /contact                                 -> /fr/en/contact  /he/en/contact
BROKEN  /terms                                   -> /fr/en/terms    /he/en/terms
BROKEN  /privacy                                 -> /fr/en/privacy  /he/en/privacy
BROKEN  /cancellation                            -> /fr/en/cancellation
BROKEN  /blog/kerem-hateimanim-neighborhood-guide -> /fr/en/blog/...
ok      /properties/penthouse-jacuzzi
```

**10 pages sur 14 sont touchées.** Les 4 pages saines sont précisément les routes `force-dynamic` (`/properties`, `/events`, `/reservation`, `/properties/[id]`), rendues à la requête avec la vraie URL.

**C'est plus grave qu'un problème SEO.** Un visiteur anglophone qui clique « FR » ou « עב » depuis la page d'accueil, le blog, la FAQ ou une page produit **atterrit sur une page 404**. La France est le marché au meilleur CTR du site (18,9 %). Google n'a découvert que 6 de ces URLs ; il y en a au moins 24 (12 pages × 2 locales).

> **Correctif (S) —** faire en sorte que `stripLocalePrefix` retire aussi `/en` :
> ```ts
> export function stripLocalePrefix(pathname: string): string {
>   for (const locale of LOCALES) {          // ← ne plus sauter DEFAULT_LOCALE
>     if (pathname === `/${locale}`) return '/';
>     if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
>   }
>   return pathname;
> }
> ```
> Ajouter un test unitaire (`node:test`) couvrant `/en`, `/en/terms`, `/fr/terms`, `/terms`.
> Puis, dans GSC, demander la réindexation et surveiller la disparition du bucket 404.

`/react-text` est un artefact de rendu React exposé comme lien crawlable — à traiter dans la même passe.

### 1.3 « Bloquée par robots.txt » (4) — P0

Les 4 URLs bloquées sont **des feuilles de style et une police** :
`/_next/static/css/03d6883fdde44edd.css`, `/_next/static/css/c743f69f1405335c.css`, `/_next/static/css/97e94c1a6220ae97.css`, `/_next/static/media/e4af272ccee01ff0-s.p.woff2`.

Cause : `src/app/robots.ts:10` → `disallow: ['/api/', '/_next/', '/admin', '/admin/']`.

Google demande explicitement que le CSS et le JS soient crawlables. En les bloquant, Googlebot rend le site sans styles, ce qui dégrade l'évaluation du rendu et de l'ergonomie mobile.

> **Correctif (S) —** retirer `/_next/` de la liste. Garder `/api/` et `/admin`.
> ```ts
> disallow: ['/api/', '/admin', '/admin/'],
> ```
> Note secondaire : la directive `host:` (ligne 14) est non standard et ignorée par Google — sans danger, mais inutile.

### 1.4 Points vérifiés et **sains**

- `sitemap.xml` : 70 URLs, lu le 9 août, statut « Opération effectuée », **aucune URL polluée** par `/fr/en`. Le bug ne contamine ni le sitemap ni les hreflang. ✅
- Les pages `/fr/blog/[slug non traduit]` ne figurent **pas** dans le bucket 404 — le comportement de `FULLY_TRANSLATED_BLOG_SLUGS` est correct. ✅
- Les 404 renvoient bien un **statut HTTP 404** (pas de soft-404). ✅

### 1.5 Page 404 — hygiène (P2)

La page 404 émet **deux balises robots contradictoires** et un canonical vers l'accueil :

```html
<meta name="robots" content="noindex"/>              <!-- Next.js -->
<title>Luxury Apartments in Tel Aviv | Or Hakerem…</title>   <!-- hérité de l'accueil -->
<meta name="robots" content="index, follow"/>        <!-- hérité du layout racine -->
<link rel="canonical" href="https://www.orhakerem.com"/>
```

Google retient la directive la plus restrictive (`noindex`) et le statut 404 protège de toute façon. **Le risque réel est faible** — mais c'est du bruit à nettoyer : ajouter `robots: { index: false }` et `alternates: { canonical: null }` dans `src/app/[locale]/[...rest]/page.tsx` et `not-found.tsx`.

---

## 2. Données de performance — ce que disent réellement GSC et GA4

### 2.1 Requêtes (16 mois) — le problème est le **classement**, pas le CTR

| Requête | Clics | Impr. | CTR | **Position** |
|---|---:|---:|---:|---:|
| hakerem luxury apartments | 3 | 188 | 1,6 % | **10,2** |
| kerem hateimanim | 1 | 252 | 0,4 % | 17,5 |
| yemenite quarter tel aviv | 1 | 39 | 2,6 % | 10,1 |
| **דירות יוקרה בתל אביב** | 0 | 174 | 0 % | **48,6** |
| **hakerem** | 0 | 162 | 0 % | **9,4** |
| kerem hateimanim distance to beach tel aviv | 0 | 152 | 0 % | 9,4 |
| kerem hateimanim walking distance to beach | 0 | 123 | 0 % | 11,2 |
| concierge services tel aviv | 0 | 37 | 0 % | 46,4 |
| long stay apartments near tel aviv beach | 0 | 21 | 0 % | 6,6 |
| luxury venue israel | 0 | 15 | 0 % | 88,5 |

**Trois lectures dures :**

1. **Le site ne classe pas premier sur son propre nom.** `hakerem luxury apartments` → position **10,2**. `hakerem` → position **9,4**. Une entreprise doit être en position 1 sur sa marque. À la position 9-10, le CTR s'effondre mécaniquement — d'où 1,6 % au lieu de 30-60 %. **C'est le déficit le plus anormal de tout l'audit.** Cause probable : collision d'entité (« Hakerem » est aussi un nom de lieu générique) + profil de liens quasi nul (§5).
2. **Les termes commerciaux hébreux sont hors-jeu** : positions 48 à 64. La locale HE est neuve, c'est attendu — mais cela chiffre l'opportunité.
3. **Le cluster « distance plage » est en position 8-12 avec 0 % de CTR.** L'audit de juin a créé la page dédiée : elle se classe, mais en bas de page 1, là où le CTR est structurellement proche de zéro. Le correctif n'est pas d'écrire un autre article, c'est de faire monter celui-ci.

### 2.2 Pages — la révélation FR/HE

| Page | Clics | Impr. | CTR | Position |
|---|---:|---:|---:|---:|
| `https://orhakerem.com/` (non-www, legacy) | 87 | 858 | 10,1 % | 8,1 |
| `https://www.orhakerem.com/` | 60 | 1 689 | 3,6 % | 7,6 |
| **`/fr`** | 16 | 90 | **17,8 %** | **3,9** |
| `/blog/kerem-hateimanim-neighborhood-guide` | 7 | 685 | 1,0 % | 10,7 |
| `orhakerem.com/events` (legacy) | 7 | 484 | 1,4 % | 14,8 |
| **`/he`** | 7 | 49 | **14,3 %** | **4,1** |
| `/events` | 6 | 402 | 1,5 % | 5,7 |
| `/blog/tel-aviv-on-shabbat-what-is-open` | 4 | 158 | 2,5 % | 7,1 |
| `/blog/shabbat-friendly-stays-tel-aviv` | 3 | 410 | 0,7 % | 12,4 |
| `/contact` | 2 | 292 | 0,7 % | 19,9 |

**`/fr` (pos. 3,9 — CTR 17,8 %) et `/he` (pos. 4,1 — CTR 14,3 %) sont les meilleures pages du site**, loin devant l'accueil anglais (pos. 7,6 — 3,6 %). L'investissement i18n est validé par la donnée. C'est **la** direction à amplifier.

*Réponse à une question soulevée pendant l'audit :* `/blog` (l'index) **ne** capte pas les impressions à la place de ses articles — c'est bien `/blog/kerem-hateimanim-neighborhood-guide` qui porte 685 impressions. L'observation inverse était un artefact d'outil.

### 2.3 Pays — l'anglais fait du volume, le français fait du chiffre

| Pays | Clics | Impr. | CTR | Position |
|---|---:|---:|---:|---:|
| Israël | 121 | 2 302 | 5,3 % | 13,8 |
| **France** | 41 | 217 | **18,9 %** | **5,4** |
| États-Unis | 22 | 2 078 | **1,1 %** | 10,9 |
| Inde | 6 | 225 | 2,7 % | 73,9 |
| Pays-Bas | 1 | **245** | 0,4 % | 7,7 |
| Royaume-Uni | 1 | **203** | 0,5 % | 15,7 |

Marchés anglophones (US + NL + UK + CA) : **2 636 impressions → 26 clics = 1,0 %**.
France : **217 impressions → 41 clics = 18,9 %**.

Le français convertit **19× mieux** que l'anglais. Le contenu informationnel anglais génère du volume qui ne clique pas et ne réserve pas.

### 2.4 Appareils

| Appareil | Clics | Impr. | CTR | Position |
|---|---:|---:|---:|---:|
| Mobile | **131** | 1 966 | **6,7 %** | **7,2** |
| Ordinateur | 78 | 4 483 | 1,7 % | 16,6 |
| Tablette | 1 | 18 | 5,6 % | 23,4 |

Le mobile fait **62 % des clics** avec 30 % des impressions, et se classe deux fois mieux. Le mobile est le canal business — ce qui rend le LCP mobile (§4) pertinent malgré de bons scores.

### 2.5 GA4 — 🔴 aucune mesure de conversion

**Acquisition, 28 derniers jours (13 juil. – 9 août) :** 143 sessions, 62,94 % d'engagement, 41 s, 740 événements.

| Canal | Sessions | Engagement | Durée |
|---|---:|---:|---:|
| Organic Search | 58 (40,6 %) | 62,1 % | 34 s |
| Direct | 49 (34,3 %) | 59,2 % | 31 s |
| Organic Social | 15 (10,5 %) | **80 %** | **2 min 03** |
| **AI Assistant** | **12 (8,4 %)** | 58,3 % | 26 s |
| Referral | 5 | 60 % | 9 s |
| Paid Social | 4 | 75 % | 23 s |

**Deux constats majeurs :**

**(a) Aucun événement de conversion n'est configuré.** Les seuls événements collectés (7 derniers jours) sont ceux de la mesure automatique GA4 : `page_view`, `session_start`, `first_visit`, `user_engagement`, `scroll`, `click`. **Aucun événement métier** — pas de soumission du formulaire de réservation, pas de contact, pas de clic WhatsApp. Le Meta Pixel, lui, déclenche bien un `Lead` via `trackMetaLead()` (`src/lib/meta-events.ts:57-82`) — mais GA4 n'a pas d'équivalent.

Conséquence : **il est impossible aujourd'hui de dire quelle page, quelle locale ou quel mot-clé génère une demande de réservation.** Tout arbitrage SEO se fait à l'aveugle.

> **Correctif (M) — priorité haute.** Déclencher des événements GA4 aux mêmes points que `trackMetaLead` (contact, conciergerie, événement, réservation, WhatsApp), les marquer comme *événements clés* dans GA4, et lier GSC ↔ GA4. Respecter le gating de consentement existant.
> ⚠️ La vue d'ensemble 90 jours affiche **27 événements clés**, alors que les 28 derniers jours en affichent **0** sur tous les canaux. Un suivi a donc existé puis s'est arrêté vers mi-juillet — à investiguer en priorité.

**(b) « AI Assistant » représente déjà 8,4 % des sessions** (`chatgpt.com / ai-assistant` visible dans les sources). Le trafic issu des LLM est un canal réel et mesurable. Cela justifie d'investir dans `public/llms.txt` et les données structurées — et rend la **NAP incohérente (§3.3) réellement coûteuse**, car c'est ce fichier que lisent les assistants.

**(c) Sous-mesure structurelle.** GA4 est chargé en `strategy="lazyOnload"` et entièrement conditionné au consentement (`CookieConsent.tsx:208-209`). Les chiffres GA4 sont donc un **plancher**, pas une mesure. À garder en tête dans tout arbitrage.

---

## 3. Données structurées, local & E-E-A-T

### 3.1 Ce qui existe (et fonctionne)

`LodgingBusiness` global (`src/lib/business-schema.ts`), `LodgingBusiness` par bien avec `makesOffer`/`amenityFeature` (`src/lib/property-seo.ts:125-192`), `FAQPage`, `AboutPage`, `Blog`, `BlogPosting` (avec auteur Person + LinkedIn), `BreadcrumbList` (blog uniquement), `WebPage` (privacy/cancellation).

C'est **au-dessus de tous les concurrents directs mesurés** — HolyGuest n'a aucun JSON-LD, Isralet non plus.

### 3.2 Ce qui manque — par valeur business décroissante

| Schema | Impact | Détail |
|---|---|---|
| **`Review` + `AggregateRating`** | 🔴 **Le plus fort** | Aucun avis sur le site. Le fondateur est **Superhost Airbnb** — cette preuve sociale est invisible. C'est le signal de confiance n°1 pour un visiteur US qui compare avec Booking.com. ⚠️ **Uniquement de vrais avis, réellement affichés sur la page.** Ne jamais fabriquer de note. |
| **`VideoObject`** | 🔴 Direct | GSC : **0 vidéo indexée / 7 non indexées**, 0 vidéo découverte dans le sitemap. Les vidéos hero (`/`, `/events`) n'ont aucun balisage. |
| **`BreadcrumbList` hors blog** | 🟠 | GSC ne valide que **2** fils d'Ariane — uniquement le blog. Manque sur `/properties`, `/properties/[id]`, `/services`, `/events`, pages légales. |
| **`WebSite` + `SearchAction`** | 🟠 | Absent. `myguesttlv.com` l'a. Contribue à la reconnaissance d'entité — donc au problème de marque du §2.1. |
| **`Organization` autonome** | 🟠 | N'existe qu'imbriqué. Même enjeu d'entité. |
| **`Event` / `Service` + `OfferCatalog`** | 🟠 | `/events` et `/services` n'ont aucun balisage métier alors que ce sont des pages commerciales. |
| **`ItemList` sur `/properties`** | 🟡 | Page de listing sans balisage de liste. |

### 3.3 🔴 Incohérence NAP — à corriger **avant** toute soumission d'annuaire

| Donnée | `src/lib/business-schema.ts` | `public/llms.txt` |
|---|---|---|
| **Téléphone** | `+972585778891` | `+972 52 686 9791` ❌ |
| Capacité penthouse | `maxGuests: 7` (`property-seo.ts:31`) | « up to 6 guests » ❌ |

La NAP est le signal le plus déterminant en SEO local. `llms.txt` est en plus **le fichier lu par les assistants IA** — canal qui pèse déjà 8,4 % du trafic. Deux versions du numéro de téléphone circulent.

> **Correctif (S) — à faire en premier.** Trancher le bon numéro, propager partout (`business-schema.ts`, `llms.txt`, footer, `/contact`, liens `tel:`), **puis** attaquer les citations d'annuaires (§5).

### 3.4 Localisation du schema (P2)

- `property-seo.ts:134` (`name`) et `:164-175` (`amenityFeature`) sont **codés en dur en anglais**, y compris sur `/fr/...` et `/he/...`.
- `LegalPageShell` : `name`/`description` du `WebPage` en anglais pour les 3 locales.
- `/terms` est la **seule** page légale sans aucun JSON-LD (`terms/page.tsx:36-40`) et sans `keywords`.

---

## 4. Performance — non prioritaire, et c'est une bonne nouvelle

Lighthouse local, 8 URLs × mobile/desktop (9 août 2026) :

| URL | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| home — desktop | **100** | 95 | 100 | **100** | 0,7 s | 0 | 0 ms |
| home — mobile | 89 | 95 | 100 | **100** | **3,3 s** | 0 | 0 ms |
| fr — desktop | **100** | 95 | 100 | **100** | 0,7 s | 0 | 0 ms |
| fr — mobile | 88 | 95 | 100 | **100** | **3,4 s** | 0 | 20 ms |
| he — mobile | 89 | 95 | 100 | **100** | 3,3 s | 0 | 20 ms |
| properties — mobile | 92 | 95 | 100 | **100** | 2,8 s | 0 | 0 ms |
| penthouse — mobile | 91 | 97 | 100 | **100** | 3,1 s | 0 | 10 ms |
| events — mobile | 89 | 97 | 100 | **100** | 3,3 s | 0 | 10 ms |
| blog — mobile | 96 | 97 | 100 | **100** | 2,5 s | 0 | 0 ms |

**Le site est rapide.** Desktop parfait, CLS nul, TBT quasi nul, SEO 100 partout, accessibilité 95-97. Les seules opportunités détectées dépassent à peine 150 ms / 25 Ko.

**Seul point : LCP mobile à 3,1-3,4 s** (seuil « bon » = 2,5 s). Comme le mobile fait 62 % des clics, c'est le seul chantier perf qui mérite du temps — et il est modeste.

> Core Web Vitals GSC = « Aucune donnée » sur mobile **et** desktop : le trafic terrain (CrUX) est insuffisant. **Les CWV ne sont donc pas un facteur de classement appliqué aujourd'hui.** C'est un sujet de conversion et de préparation, pas d'urgence SEO.

**Hygiène (P2, sans impact SEO direct) :** ~144 Mo de médias non référencés dans `public/` (`hero-events-2.mov` 50 Mo, `hero-events-2 2.mov`, `hero-original.mp4` 22 Mo, `events-video-original.mp4` 10 Mo, `img_5322.jpg` 6,7 Mo). Ils gonflent l'artefact de déploiement sans être servis. À supprimer.

**Sécurité (P2) :** `next.config.mjs:14-29` autorise `remotePatterns: https://**` **et** `http://**` — n'importe quel hôte peut être proxifié via `/_next/image`. À restreindre aux domaines réellement utilisés.

---

## 5. Stratégie de contenu & concurrence

*(Analyse concurrentielle mesurée en direct le 9 août 2026 : nombre de mots = HTML rendu, scripts/styles retirés.)*

### 5.1 Le vrai goulot d'étranglement

| Page | Mots rendus | | Concurrent | Mots |
|---|---:|---|---|---:|
| `orhakerem.com/` | **545** | | MyGuestTLV — accueil | 2 216 |
| `/fr` | 597 | | MyGuestTLV — `/location-saisonniere-tel-aviv/` | 1 713 |
| `/he` | 452 | | Five Stay — accueil | 1 936 |
| `/properties` | **402** | | HolyGuest — accueil | 1 124 |
| `/events` | 479 | | MyGuestTLV — `/short-term-rental-tel-aviv/` | 1 142 |

**Les pages commerciales d'Or Hakerem font 20 à 35 % de la profondeur des sites qui occupent ces SERP.** Des mots-clés dans les `<meta>` ne comblent pas un écart de contenu de 4×.

L'audit de juin recommandait des pages d'atterrissage commerciales. **Cela n'a pas été fait** — `https://www.orhakerem.com/luxury-apartments-tel-aviv` renvoie 404, et aucune route commerciale n'existe. Ce qui a été fait à la place (i18n complet, 7 nouveaux articles, traductions) est substantiel et utile — mais le manque commercial demeure.

### 5.2 Le constat inconfortable

> Or Hakerem a **une meilleure qualité technique que la plupart de ses concurrents directs** (hreflang correct, JSON-LD riche, sitemap propre, métadonnées réellement localisées) et **beaucoup moins de contenu**. HolyGuest n'a aucun schema et 2× plus de mots. MyGuestTLV n'a aucun hreflang et 6× plus de pages. Isralet a deux `<h1>` et dépasse tout le monde grâce à un simple chemin d'URL.
>
> **Chaque heure passée à raffiner le schema pendant que `/properties` reste à 402 mots est mal allouée.**

### 5.3 Où un petit site peut réellement gagner

Ne **pas** attaquer `luxury apartments tel aviv` en anglais : Booking, Airbnb, Tripadvisor, Vrbo, Plum Guide occupent la page 1 avec des autorités de domaine 80-95. Les tags existants ne coûtent rien et peuvent rester ; construire des pages pour ces termes serait de l'argent perdu.

Terrains réellement gagnables :
1. **Hyper-local** — `apartment near Carmel Market`, `apartment near Banana Beach`. Les agrégateurs classent des catégories, pas des micro-quartiers. *(Et MyGuestTLV exploite déjà des pages ciblant la rue même d'Or Hakerem.)*
2. **Français** — les agrégateurs traduisent des gabarits, pas du contenu. L'incumbent `location-tel-aviv.fr` est un site XHTML 1.0 avec du mojibake dans sa meta description. **Vulnérable.**
3. **`צימר` en hébreu** — mot-clé le plus clairement inexploité de tout l'audit. En usage israélien, `צימר` = escapade courte, souvent **avec jacuzzi**. Or Hakerem vend un penthouse avec jacuzzi privatif sur le toit. Le mot n'apparaît **nulle part** dans `seo.ts` ni `property-seo.ts`.
4. **Événementiel** — Airbnb ne vend pas de lieux de réception. SERP totalement contestable, et c'est la demande domestique israélienne (`מקום לאירוע קטן`, `בר מצווה`, `מסיבת רווקות`).
5. **Le quartier** — `ronkin-list.com` dépasse aujourd'hui Or Hakerem **sur son propre quartier**, avec la bonne architecture (guide éditorial → page commerciale).

### 5.4 Feuille de route contenu — top 6 (ordonnée par impact ÷ effort)

| # | Chantier | Cible | Locale | Effort | Impact |
|---|---|---|---|---|---|
| 1 | Section **`צימר` / suite jacuzzi** sur la page penthouse + mots-clés HE | `צימר תל אביב`, `צימר עם ג'קוזי` | **HE** | **S** | **Élevé** — meilleur impact/heure de l'audit |
| 2 | **Landing FR** « Location courte durée & saisonnière à Tel Aviv » (~1 200-1 500 mots) | `location courte durée Tel Aviv` | **FR** | M | **Élevé** — marché à 18,9 % de CTR, incumbents cassés |
| 3 | **Landing « Carmel Market & Banana Beach »** (~1 200 mots) | `apartment near carmel market` | EN→FR→HE | M | **Élevé** — terme commercial le moins concurrentiel |
| 4 | **Approfondir `/events`** (479 → 1 200+ mots) + schema `Event`/`Service` | `event space tel aviv`, HE événementiel | EN + **HE** | M | **Élevé** — 2ᵉ page en impressions sur 479 mots |
| 5 | **Faire du guide de quartier le pilier** (1 187 → 2 000+ mots) | `kerem hateimanim` | EN + FR | M | **Élevé** — récupère le quartier, règle le hub/spoke US |
| 6 | **Consolider** `book-direct-vs-airbnb` → `book-tel-aviv-apartment-directly` (301) | `book direct tel aviv apartment` | ×3 locales | S | Moyen — cannibalisation confirmée : **6 URLs pour 1 requête** |

**Ne pas traduire** `best-time-to-visit-tel-aviv` et `ben-gurion-airport…` en hébreu : les Israéliens ne cherchent pas cela. La symétrie n'est pas une stratégie.

### 5.5 Netlinking — le plan existe, l'exécution non

`docs/backlink-opportunities.md` et `docs/seo-backlink-outreach.md` contiennent **60 prospects qualifiés**, avec routes de contact vérifiées, angles éditoriaux et garde-fous anti-liens payants. C'est un travail de préparation de très bonne qualité.

**Exécution réelle : 1 envoi sur 60 (1,7 %)**, sur ~3 semaines, sans résultat consigné.

C'est cohérent avec tout le reste de l'audit : une position moyenne de 13,7 malgré un bon travail on-page est la signature classique d'un **contenu correct sans autorité derrière**. Et c'est très probablement la cause du déficit de marque du §2.1.

> **À faire :** transformer le plan en cadence — **5 contacts/semaine pendant 12 semaines**. Commencer par les **citations d'annuaires** (easy.co.il, Zap/Dapei Zahav, Bing Places, Apple Business Connect, Foursquare, Waze) : gratuit, rapide, sans négociation, et cela attaque directement le problème d'entité de marque. **Prérequis : corriger la NAP (§3.3) d'abord.**
> **Manque majeur :** aucun prospect francophone dans les deux documents, alors que la France est le meilleur marché. À ajouter.

---

## 6. Autres constats

| # | Constat | Sév. | Correctif |
|---|---|---|---|
| 1 | `/contact` : 292 impressions, 2 clics, position 19,9 — et **absent de la navbar** (« Contact » pointe vers `/#contact`) | P1 | Lier `/contact` depuis la navbar |
| 2 | `/blog` absent du footer ; `/reservation` absent de la navbar | P2 | Compléter le maillage |
| 3 | `/properties/[id]` rend **2 `<h1>`** (`property-details-client.tsx:970` et `:994`, variantes mobile/desktop) | P2 | Un seul `<h1>`, masquer l'autre par CSS sans le dupliquer |
| 4 | Aucune balise de vérification Google Search Console dans le code | P2 | Ajouter `verification` dans les metadata |
| 5 | `sitemap.ts` : `lastModified = new Date()` pour 42 URLs → toujours « maintenant », signal dévalué | P2 | Utiliser une vraie date de modification |
| 6 | Article `penthouse-vs-studio…` : `image: /penthouse/4-terrasse-ext-coucher-soleil.png` — **fichier inexistant** (seul le `.jpg` existe) → og:image cassée | P2 | Corriger le frontmatter |
| 7 | `vercel.json` : règle de cache sur `/static/(.*)`, chemin qui n'existe pas (Next sert `/_next/static`) | P3 | Corriger ou supprimer |
| 8 | `middleware.ts` : `/rentals/:path*` est matché mais seules 4 chaînes exactes redirigent ; les chemins profonds tombent en 404 | P3 | Élargir la règle |
| 9 | `/services` : hero en `backgroundImage` CSS (1,72 Mo PNG) → contourne `next/image` | P3 | Passer par `next/image` |
| 10 | Hero vidéo `/events` sans `poster` alors que `hero-events-2-poster.webp` existe | P3 | Ajouter le `poster` |
| 11 | Arbre `src/app/[locale]/admin/*` inatteignable (code mort) + dossiers/fichiers dupliqués `… 2.ts` | P3 | Nettoyer |

---

## 7. Plan d'action priorisé

### Cette semaine — correctifs saignants (effort total : ~1 jour)

1. 🔴 **Corriger `stripLocalePrefix`** → supprime 24+ URLs 404 et **répare le sélecteur de langue** pour les visiteurs FR/HE. *(§1.2)*
2. 🔴 **Retirer `/_next/` de `robots.txt`** → rend le CSS et les polices crawlables. *(§1.3)*
3. 🔴 **Trancher et propager le bon numéro de téléphone** (NAP). *(§3.3)*
4. 🟠 Nettoyer les metadata de la page 404 (`noindex`, `canonical: null`). *(§1.5)*
5. 🟠 Lier `/contact` depuis la navbar. *(§6.1)*

### Ce mois — mesure et fondations

6. 🔴 **Instrumenter les conversions GA4** (réservation, contact, WhatsApp) + les marquer comme événements clés + investiguer l'arrêt des 27 événements clés. **Sans cela, rien de ce qui suit n'est mesurable.** *(§2.5)*
7. 🟠 Ajouter `VideoObject` (0/7 vidéos indexées), `BreadcrumbList` hors blog, `WebSite`+`SearchAction`, `Organization`. *(§3.2)*
8. 🟠 Faire les **citations d'annuaires** (7 plateformes, gratuites) — après le correctif NAP. *(§5.5)*
9. 🟠 Lancer la cadence de netlinking : **5 contacts/semaine**, en commençant par les organisateurs d'événements et en ajoutant un volet francophone. *(§5.5)*

### Ce trimestre — le vrai levier

10. 🔴 **Section `צימר`/jacuzzi en hébreu** — meilleur rapport impact/effort du site. *(§5.4 #1)*
11. 🔴 **Landing commerciale française** — marché à 18,9 % de CTR, concurrence techniquement obsolète. *(§5.4 #2)*
12. 🟠 Landing « Carmel Market & Banana Beach », approfondissement de `/events`, pilier de quartier. *(§5.4 #3-5)*
13. 🟡 Consolider les doublons `book-direct`. *(§5.4 #6)*
14. 🟡 Ajouter de **vrais** avis + `AggregateRating` (statut Superhost Airbnb aujourd'hui invisible). *(§3.2)*

---

## 8. Limites de cet audit

À énoncer clairement plutôt que masquer :

- **Aucune donnée de volume de recherche réelle.** Les connecteurs **Ahrefs** et **SimilarWeb** sont présents mais non authentifiés dans cette session. Toutes les estimations de difficulté et de dimensionnement sont **relatives**, pas mesurées. **Les authentifier est le déblocage outil le plus rentable pour ce compte.**
- **Le profil de backlinks a été approché par recherche SERP gratuite** — cela manque les liens nofollow, les pages non indexées et tout ce qui est sous la ligne de flottaison.
- Les chiffres GA4 sont un **plancher** (chargement `lazyOnload` + consentement obligatoire), pas une mesure exhaustive.
- Core Web Vitals : aucune donnée terrain — les mesures Lighthouse sont du **laboratoire**.
- Cet audit **n'a modifié aucun fichier de l'application.** Ce document est le seul livrable écrit.

---

*Audit réalisé le 9 août 2026. Données GSC arrêtées au 7 août 2026 ; GA4 au 9 août 2026.*
