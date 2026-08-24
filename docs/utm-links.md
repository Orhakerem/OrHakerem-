# Liens UTM — Or Hakerem

**Créé le :** 25 août 2026
**Pourquoi :** 43,3 % du trafic (231 sessions / 90 j) tombe en « Direct ». Voir `ANALYTICS-AUDIT-2026-08-25.md` §5.2.

---

## 0. Le problème en une phrase

Pour un site de cette taille, 43 % de Direct ne veut pas dire « les gens tapent votre URL de mémoire ». Cela veut dire que **43 % de votre trafic arrive sans provenance identifiable** : liens WhatsApp, bio Instagram, QR codes, signature d'e-mail. Maintenant que les conversions sont enfin mesurées (depuis le 25 août), c'est le prochain angle mort : vous saurez *combien* de demandes vous recevez, mais pas *d'où* elles viennent.

Un UTM est un simple paramètre ajouté à la fin d'une URL. Il ne change rien pour le visiteur, il ne modifie pas la page, il dit juste à GA4 « ce clic vient d'ici ».

---

## 1. Vérifications techniques faites le 25 août

Avant de vous faire coller des liens partout, j'ai vérifié que ça fonctionne réellement sur votre site :

| Test | Résultat |
|---|---|
| `http://orhakerem.com/?utm_…` → redirection | ✅ Paramètres **préservés** (308) |
| `https://orhakerem.com/?utm_…` → apex vers www | ✅ Préservés (308) |
| `/rentals?utm_…` → `/properties` | ✅ Préservés (301) |
| Chemins localisés (`/fr?utm_…`) | ✅ Préservés |
| GA4 reçoit bien la campagne | ✅ Le hit `page_view` porte l'URL complète |
| **Balise canonical** sur une URL avec UTM | ✅ **Reste propre** (`…/fr` sans paramètres) |

Le dernier point est le plus important pour le SEO : les URLs avec UTM ne créeront **pas** de contenu dupliqué dans l'index Google, parce que le canonical pointe toujours vers la version propre.

---

## 2. ⚠️ La règle qui fait échouer 90 % des plans UTM

**N'utilisez que des valeurs de `utm_medium` que GA4 reconnaît.** Sinon le trafic tombe dans « Unassigned », et vous aurez remplacé un angle mort par un autre.

> C'est probablement déjà ce qui produit les **4 sessions « Unassigned »** visibles sur 90 jours : un lien tagué avec un médium que GA4 ne sait pas classer.

Les seules valeurs sûres :

| `utm_medium` | Canal GA4 résultant |
|---|---|
| `social` | Organic Social |
| `email` | Email |
| `referral` | Referral |
| `affiliate` | Affiliates |
| `sms` | SMS |
| `cpc` / `ppc` | Paid Search / Paid Social |

**Tout le reste** (`messaging`, `offline`, `qr`, `bio`, `print`…) → **Unassigned**. À éviter.

Deux autres règles :

- **Jamais d'UTM sur un lien interne au site.** Cela redémarrerait l'attribution en pleine visite et attribuerait la conversion au mauvais canal. Les UTM ne vont **que** sur des liens qui viennent de l'extérieur.
- **Pas d'UTM dans `llms.txt`, le sitemap ou les données structurées.** Ce sont des références canoniques ; les taguer brouillerait les signaux d'entité qu'on vient de mettre en place.

---

## 3. Les liens à coller

Tout est en minuscules et sans accent : GA4 est sensible à la casse, `Instagram` et `instagram` créeraient deux sources distinctes.

### 🔴 Priorité 1 — les plus gros volumes

**Bio Instagram** — remplace le lien actuel `https://www.orhakerem.com/`
```
https://www.orhakerem.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio
```

**Page Facebook** — champ « Site web »
```
https://www.orhakerem.com/?utm_source=facebook&utm_medium=social&utm_campaign=page
```

**Google Business Profile** — bouton « Site web »
```
https://www.orhakerem.com/?utm_source=google_business_profile&utm_medium=referral&utm_campaign=gbp
```
> ⚠️ Ne mettez **pas** `utm_medium=organic` ici. GA4 le classerait en « Organic Search » et le trafic de votre fiche Google se mélangerait au SEO — exactement ce qu'on cherche à séparer. `referral` l'isole proprement.

**Messages WhatsApp** — le lien que vous envoyez aux prospects
```
https://www.orhakerem.com/?utm_source=whatsapp&utm_medium=social&utm_campaign=direct
```
> WhatsApp fait partie de la liste des sources sociales reconnues par GA4, donc `social` fonctionne. `messaging` ne fonctionnerait pas.

**Signature e-mail**
```
https://www.orhakerem.com/?utm_source=email_signature&utm_medium=email&utm_campaign=signature
```

### 🟠 Priorité 2

**LinkedIn** — champ « Site web » de la page entreprise
```
https://www.orhakerem.com/?utm_source=linkedin&utm_medium=social&utm_campaign=page
```

**QR code imprimé** (livret d'accueil, carte de visite, affichette dans l'appartement)
```
https://www.orhakerem.com/?utm_source=qr_print&utm_medium=referral&utm_campaign=onsite
```
> `referral` plutôt que `offline` ou `print`, qui tomberaient en Unassigned. Si vous avez plusieurs supports, changez seulement `utm_source` : `qr_welcome_book`, `qr_business_card`, `qr_apartment`.

**Airbnb / plateformes** — dans un message ou un livret, jamais dans l'annonce elle-même
```
https://www.orhakerem.com/?utm_source=airbnb&utm_medium=referral&utm_campaign=guest_message
```

### 🟢 Variantes utiles

Pour envoyer directement sur une page précise, ajoutez le chemin **avant** le `?` :

```
https://www.orhakerem.com/events?utm_source=instagram&utm_medium=social&utm_campaign=events_post
https://www.orhakerem.com/fr?utm_source=whatsapp&utm_medium=social&utm_campaign=direct_fr
https://www.orhakerem.com/properties/penthouse-jacuzzi?utm_source=instagram&utm_medium=social&utm_campaign=penthouse_reel
```

Pour une publication ponctuelle, gardez `utm_source` et `utm_medium` identiques et faites varier **seulement** `utm_campaign` — c'est ce qui vous permettra de comparer deux posts entre eux.

---

## 4. Comment construire un nouveau lien

```
https://www.orhakerem.com/<page>?utm_source=<d'où ça vient>&utm_medium=<voir §2>&utm_campaign=<quoi>
```

- `utm_source` — la plateforme précise : `instagram`, `whatsapp`, `qr_welcome_book`
- `utm_medium` — **uniquement** une valeur du tableau §2
- `utm_campaign` — l'usage : `bio`, `events_post`, `soiree_juin`

Minuscules, underscores plutôt qu'espaces, pas d'accents.

---

## 5. Vérifier que ça marche

**Immédiatement :** ouvrez un lien tagué dans un navigateur, acceptez les cookies, puis dans GA4 → **Temps réel**, regardez la carte « Utilisateurs par source/support ». Votre source doit apparaître dans la minute.

**Sous 48 h :** GA4 → **Acquisition → Acquisition de trafic**, changez la dimension pour **Source/Support de la session**.

**Ce qu'il faut voir bouger sur 30 jours :** la part de « Direct » doit **baisser** nettement sous 43 %. Si elle ne bouge pas, c'est qu'il reste des liens non tagués — le premier suspect est toujours la bio Instagram.

**Le vrai objectif**, une fois les événements clés marqués : dans GA4 → Acquisition de trafic, la colonne **Événements clés** par source. C'est là que vous verrez enfin quelle plateforme génère des demandes de réservation, et laquelle génère seulement du passage.

---

## 6. Ce que je n'ai pas pu faire

Ces liens vivent sur des comptes externes — Instagram, Facebook, LinkedIn, Google Business Profile, votre client mail. **Je ne modifie pas les paramètres de vos comptes tiers.** Le collage est à vous ; comptez 2 minutes par plateforme.

Le seul endroit où j'ai pu agir, c'est le code du site — et il n'y a justement rien à y faire : les liens sortants du site (`sameAs` dans le schema, icônes sociales du pied de page) partent **vers** vos réseaux, pas l'inverse. Les taguer n'aurait aucun sens.

---

*Voir aussi : `ANALYTICS-AUDIT-2026-08-25.md` §5.2 et `docs/local-citations.md` (la fiche GBP apparaît dans les deux — taguez son bouton « Site web » au moment où vous traiterez les citations).*
