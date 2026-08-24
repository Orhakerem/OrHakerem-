# Audit analytics — Or Hakerem

**Date :** 25 août 2026
**Périmètre :** GA4 (propriété `521216501`), instrumentation côté site, liaisons produits
**Fenêtres :** 90 jours (27 mai – 24 août 2026) et 28 jours
**Audit SEO de référence :** `SEO-AUDIT-2026-08.md` §2.5

---

## 0. Verdict

**Les conversions n'étaient toujours pas mesurées — et pas pour la raison qu'on croyait.**

L'audit du 9 août avait identifié le problème (« GA4 ne mesure aucune conversion ») et le correctif avait été livré les 10-11 août (commits `2615448`, `d56db32`). **Ce correctif ne fonctionnait pas.** Les événements étaient bien construits, bien déclenchés, bien protégés par le consentement — et **jetés silencieusement** avant d'atteindre GA4, à cause d'une incompatibilité de format entre le code et le tag installé.

Résultat : deux semaines de plus à l'aveugle, avec l'illusion que le problème était réglé.

C'est corrigé et **vérifié contre l'endpoint GA4 réel** (commit `8652d46`).

### Les chiffres — 90 jours

| Métrique | Valeur |
|---|---:|
| Sessions | 533 |
| Utilisateurs actifs | 286 (+33,8 %) |
| Événements | 2 692 (+54,2 %) |
| Taux d'engagement | 59,66 % |
| Durée d'engagement moyenne | 35 s |
| **Événements clés** | **0** |
| Revenu | 0 ₪ |

---

## 1. 🔴 P0 — Les événements GA4 ne partaient pas

### Le diagnostic

`src/lib/ga-events.ts` poussait sur `dataLayer` un objet de cette forme :

```js
window.dataLayer.push({ event: 'generate_lead', lead_type: …, form_location: …, locale: … });
```

C'est **le format de Google Tag Manager**. Or `src/components/GoogleAnalytics.tsx` charge **gtag.js**, pas GTM. gtag.js ne traite que les entrées de `dataLayer` qui sont des objets `arguments` dont le premier élément est une commande (`'js'`, `'config'`, `'event'`…). Un objet simple portant une clé `event` n'est pas une commande : il est **ignoré, sans erreur, sans avertissement**.

### La preuve

Test contrôlé dans un navigateur réel, consentement accordé, gtag.js chargé, deux appels consécutifs :

| Appel | Requête vers GA4 |
|---|---|
| `dataLayer.push({event:'generate_lead', …})` — la forme du code | **aucune** |
| `gtag('event','PROBE_B',{…})` — la forme commande | `…/g/collect?…&en=PROBE_B&ep.lead_type=probe…` ✅ |

Confirmation côté GA4, onglet **Administration → Événements → Événements récents**, 28 derniers jours. Les seuls événements reçus :

```
click · first_visit · form_start · page_view · scroll · session_start · user_engagement
```

Les sept sont des événements de **mesure automatique** GA4. **Aucun événement métier.** Ni `generate_lead`, ni `contact_outbound` — ils n'ont jamais existé dans la propriété.

> ⚠️ À noter : `form_start` est présent mais **pas `form_submit`**. La mesure automatique détecte le début d'interaction avec un formulaire, mais les formulaires du site passent par des server actions React avec `preventDefault`, donc l'événement natif de soumission ne se déclenche jamais. Il n'existait donc **aucun** signal de conversion, même par accident.

### Le correctif (commit `8652d46`)

`queueGtagCommand()` construit un vrai objet `arguments` et le pousse sur `dataLayer`. L'entrée est alors byte-identique à ce que `window.gtag()` produirait — tout en conservant la raison pour laquelle le code évitait `window.gtag` au départ : le loader est en `afterInteractive`, donc une soumission précoce peut le précéder, et gtag.js vide la file d'attente à son démarrage.

**Vérifié en direct :** un clic WhatsApp produit désormais
`…&en=contact_outbound&ep.method=whatsapp&ep.location=navbar&ep.locale=en`

### Pourquoi les tests n'ont rien vu

Les tests unitaires vérifiaient que `dataLayer` recevait bien `{ event: 'generate_lead', … }`. Ils validaient exactement le mauvais contrat. Ils assertent maintenant la forme `[commande, nom, paramètres]` — celle que gtag.js consomme réellement.

---

## 2. 🔴 P0 — Aucun événement clé pertinent n'est configuré

Même une fois les événements émis, ils **ne compteront pas comme conversions** tant qu'ils ne sont pas marqués « événement clé » dans GA4.

État actuel de **Administration → Événements → Événements clés** :

| Événement clé configuré | Flux actifs (28 j) |
|---|---|
| `ads_conversion_Demande_de_devis_1` | **Aucune donnée détectée** |
| `purchase` | **Aucune donnée détectée** |

Les deux sont morts. `purchase` est un événement e-commerce par défaut que ce site n'émettra jamais. `ads_conversion_Demande_de_devis_1` vient d'une action de conversion Google Ads — voir §3.

**Ni `generate_lead` ni `contact_outbound` n'y figurent.**

> **À faire, dans cet ordre :**
> 1. Fusionner `dev` → `main` et déployer (sans ça les événements n'arrivent pas en production)
> 2. Attendre 24-48 h que GA4 enregistre les premiers `generate_lead` / `contact_outbound`
> 3. Les marquer comme **événements clés** (l'étoile à côté du nom)
> 4. Retirer `purchase` de la liste — il pollue le rapport avec une conversion qui ne peut pas exister

C'est un changement de paramètres sur votre propriété : je ne le fais pas sans votre accord explicite, et de toute façon l'étape 1 doit venir avant.

---

## 3. 🔴 Google Ads dépense sans signal de conversion

| Constat | Détail |
|---|---|
| Compte lié | `607-285-6086`, depuis le 22 février 2026 ✅ |
| Publicité personnalisée | **Désactivée** |
| Conversion `ads_conversion_Demande_de_devis_1` | **Aucune donnée de flux** |
| Balise de conversion Google Ads dans le code | **Absente** — aucun `AW-…` dans tout le dépôt |
| Sessions Paid Search + Cross-network (90 j) | **3** — engagement 0 %, durée 0 s |

Trois lectures :

1. **Il n'y a aucune balise de conversion Google Ads sur le site.** La politique de confidentialité documente pourtant « les données de conversion et de remarketing Google Ads ». Le document décrit un dispositif qui n'existe pas techniquement.
2. **3 sessions payantes en 90 jours**, avec 0 % d'engagement. Soit les campagnes sont à l'arrêt, soit le budget ne produit rien de mesurable.
3. **La publicité personnalisée est désactivée**, ce qui empêche d'exporter les audiences GA4 vers Google Ads. C'est peut-être un choix de confidentialité assumé — cohérent avec votre bandeau de consentement — mais il faut le savoir : le remarketing est hors circuit.

> **Décision à prendre :** soit vous arrêtez Google Ads (3 sessions/90 j ne justifient pas la complexité), soit vous branchez la conversion correctement en important `generate_lead` depuis GA4 une fois §2 fait. **Ne laissez pas tourner un budget sans signal de retour.**

---

## 4. 🟠 Conservation des données : 2 mois au lieu de 14

`Administration → Conservation des données` :

| | Actuel | Recommandé |
|---|---|---|
| Données d'événement | **2 mois** | **14 mois** |
| Données utilisateur | 14 mois | 14 mois ✅ |

Avec 2 mois, toute exploration, tout entonnoir, toute analyse de cohorte au-delà de 60 jours est **impossible**. Les rapports standards agrégés ne sont pas touchés, mais dès qu'on veut creuser — « d'où viennent les demandes de réservation de juin ? » — la donnée n'existe plus.

Pour une activité **saisonnière** comme la location courte durée, ne pas pouvoir comparer une saison à la précédente est un handicap réel. 14 mois est le maximum de l'offre gratuite, et le passage est gratuit.

> C'est un réglage à deux clics, mais c'est un paramètre de votre compte : dites-moi si vous voulez que je le fasse, ou faites-le vous-même — `Administration → Conservation des données → Données d'événement → 14 mois → Enregistrer`. Attention : **le changement n'est pas rétroactif**, il ne récupère pas les données déjà purgées. Plus tôt c'est fait, moins on perd.

---

## 5. Ce que disent les données, malgré tout

### 5.1 Canaux — 90 jours

| Canal | Sessions | Engagement | Durée | Lecture |
|---|---:|---:|---:|---|
| Direct | 231 (43,3 %) | 58,4 % | 30 s | ⚠️ Anormalement haut — voir §5.2 |
| **Organic Search** | 160 (30,0 %) | **68,8 %** | **44 s** | ✅ **Le meilleur canal du site** |
| Organic Social | 89 (16,7 %) | 48,3 % | 34 s | 🔻 En forte baisse — voir §5.3 |
| AI Assistant | 28 (5,3 %) | 57,1 % | 29 s | Canal réel et stable |
| Paid Social | 11 (2,1 %) | 63,6 % | **12 s** | Durée très courte |
| Referral | 10 (1,9 %) | 70 % | 25 s | Petit mais qualitatif |
| Unassigned | 4 | 0 % | 50 s | Trafic mal balisé |
| Cross-network | 2 | 0 % | 0 s | Google Ads |
| Paid Search | 1 | 0 % | 0 s | Google Ads |

**Le SEO est votre meilleur canal, et de loin.** Organic Search bat Direct sur l'engagement (68,8 % contre 58,4 %) et sur la durée (44 s contre 30 s). C'est le seul canal qui progresse en volume *et* en qualité. Tout l'argument de l'audit SEO tient debout dans la donnée GA4.

### 5.2 ⚠️ 43 % de Direct, c'est un problème d'attribution

Pour un site de cette taille, 43 % de Direct ne veut pas dire « les gens tapent votre URL de mémoire ». Cela veut presque toujours dire **du trafic non balisé** qui retombe dans Direct par défaut : liens WhatsApp, bio Instagram, QR codes, signature d'e-mail, liens dans des messages.

Concrètement : **43 % de votre trafic est invisible en termes de provenance.** Une fois les conversions actives, vous ne saurez pas quelle source les a générées.

> **Correctif (effort S, gros retour) :** ajouter des paramètres UTM à tous les liens sortants que vous contrôlez.
> Exemple : `https://www.orhakerem.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio`
> À faire au minimum sur : bio Instagram, page Facebook, signature e-mail, messages WhatsApp types, QR codes imprimés, fiche Google Business Profile.

### 5.3 🔻 Organic Social s'est effondré en qualité

| | 9 août (28 j) | 25 août (90 j) |
|---|---:|---:|
| Taux d'engagement | **80 %** | **48,3 %** |
| Durée moyenne | **2 min 03** | **34 s** |

C'était le meilleur canal du site en qualité au 9 août. Il est aujourd'hui le **moins engageant** des canaux significatifs. Le volume, lui, a tenu (16,7 % des sessions).

Une chute de cette ampleur signifie généralement un changement de nature du trafic : un contenu qui a fait de la portée sans intention, un changement de lien en bio, ou une audience différente. **Cela mérite d'être regardé côté Instagram/Facebook** — c'est le genre d'écart qui coûte cher si on continue à investir sur la base de l'ancien chiffre.

### 5.4 AI Assistant se confirme

28 sessions sur 90 jours (5,3 %), source `chatgpt.com / ai-assistant`, engagement 57,1 %. Le canal est petit mais **stable et réel**. Cela continue de justifier l'entretien de `public/llms.txt` et des données structurées — et rend la cohérence NAP d'autant plus rentable.

---

## 6. Ce qui va bien

- ✅ **Liaison GSC ↔ GA4 active** depuis le 25 janvier 2026 (`orhakerem.com`, propriété domaine). L'item de l'audit SEO §2.5 était déjà fait.
- ✅ **Le gating de consentement fonctionne correctement.** Vérifié : avant acceptation, `ga-disable-G-J0Q3G9CZWW = true`, gtag.js n'est pas chargé, aucune requête ne part. Après « Accepter tout », le flag passe à `false` et la collecte démarre. Le correctif du §1 n'a rien affaibli.
- ✅ **La taxonomie des événements est bien conçue** : `generate_lead` (événement recommandé GA4) séparé de `contact_outbound` — ne pas confondre une intention de clic WhatsApp avec une demande soumise est le bon choix, il évite de gonfler artificiellement le taux de conversion.
- ✅ **Aucune donnée personnelle ne transite.** Les événements ne portent que la taxonomie (`lead_type`, `form_location`, `locale`) — jamais un nom, un e-mail ou un téléphone. Un test le verrouille.
- ✅ Croissance saine : utilisateurs +33,8 %, événements +54,2 % sur 90 jours.

---

## 7. Limites de cet audit

- **Les chiffres GA4 sont un plancher, pas une mesure.** Chargement `lazyOnload` + consentement obligatoire : les visiteurs qui refusent ou quittent avant le bandeau ne sont jamais comptés. L'écart avec la réalité est inconnu mais non nul.
- **La rétention à 2 mois empêche toute vérification historique.** Je ne peux pas remonter au-delà de fin juin sur les données événementielles détaillées. La question « qu'est-ce qui a émis les 27 événements clés vus le 9 août et quand cela s'est-il arrêté ? » est **définitivement sans réponse** : les données sont purgées. C'est exactement le coût du §4.
- Aucune donnée de conversion n'existe encore, donc **aucune analyse de performance par page, locale ou mot-clé n'est possible aujourd'hui.** Elle le deviendra ~2 semaines après le déploiement + le marquage des événements clés.

---

## 8. Plan d'action

### Immédiat
1. ✅ **Fait le 25 août** — `dev` → `main` fusionné et déployé (`3d3ddc4`). Vérifié en production : un clic WhatsApp sur `www.orhakerem.com` produit
   `…&en=contact_outbound&ep.method=whatsapp&ep.location=navbar&ep.locale=en`.
   **Les conversions sont mesurées pour la première fois.**
2. ✅ **Fait le 25 août** — conservation des données événementielles portée de 2 à **14 mois**. Applicable sous 24 h, non rétroactif.

### Sous 48 h après déploiement
3. 🔴 Vérifier dans **GA4 → Temps réel** que `generate_lead` arrive aussi (le premier vrai envoi de formulaire le confirmera ; `contact_outbound` est déjà validé)
4. 🔴 **Marquer `generate_lead` et `contact_outbound` comme événements clés** — sans ça ils ne comptent pas comme conversions. Optionnel : retirer `purchase`, qui restera à zéro.

### Cette semaine
5. 🟠 **Baliser en UTM** tous les liens que vous contrôlez (bio Instagram, Facebook, signature, WhatsApp, QR codes) — sans quoi 43 % du trafic restera aveugle même une fois les conversions actives
6. 🟠 **Trancher sur Google Ads** : brancher la conversion correctement, ou arrêter. Pas d'entre-deux.

### Sous quinzaine
7. 🟡 Regarder ce qui s'est passé sur Organic Social (engagement 80 % → 48 %)
8. 🟡 Une fois 2 semaines de conversions accumulées : premier vrai rapport « quelle page / quelle locale / quel canal génère les demandes ». **C'est le rapport que tout ceci existe pour produire.**

---

*Audit réalisé le 25 août 2026. Données GA4 arrêtées au 24 août 2026. Correctif code vérifié contre l'endpoint GA4 de production dans un navigateur réel.*
