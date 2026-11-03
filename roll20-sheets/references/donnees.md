# Attributs et données persistantes

Lire avant d'ajouter un champ, corriger une valeur ou changer un calcul.

| Contexte | Exemple |
| --- | --- |
| Contrôle HTML | `name="attr_force"` |
| Affichage | `<span name="attr_force"></span>` |
| Worker | `getAttrs(["force"], callback)` ; `setAttrs({force: 3})` |
| Événement | `change:force` |
| Macro | `@{force}` |
| Maximum | HTML `attr_pv_max`, worker `pv_max`, macro `@{pv\|max}` |
| Bouton action | `name="act_repos"` → `clicked:repos` |
| Bouton roll | `name="roll_attaque"` → `%{Personnage\|attaque}` |

Les préfixes de liaison HTML `attr_` et `act_` ne font pas partie des noms passés à `getAttrs`/`setAttrs`. Employer des noms techniques stables, de préférence minuscules, sans espace ni accent pour les nouveaux champs. Préserver les noms historiques ou prévoir une migration.

## Contrat d'un champ

Déterminer source, type, unité, valeur initiale, bornes, responsable des écritures et dépendances. Séparer saisie, bonus, total, présentation et état d'interface quand leurs rôles diffèrent. Deux contrôles homonymes représentent la même donnée : cela peut être un miroir volontaire.

`placeholder` ne sauvegarde rien. Un changement de `value` HTML ne migre pas les valeurs déjà enregistrées. Un `<span>` affiche une donnée, sans assurer son initialisation. Les limites du contrôle HTML ne remplacent pas la validation des imports et calculs.

## Vide et zéro

```js
const toNumber = (value, fallback = 0) => {
  if (value == null || String(value).trim() === "") return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
```

Utiliser un repli explicite. `Number(v.pv) || maximum` remplit une réserve à zéro. `parseInt("2d6", 10)` accepte un préfixe numérique : ce n'est pas une validation de saisie entière. Une virgule décimale nécessite une politique de saisie, pas une conversion implicite supposée.

Checkbox à `value="1"` : comparer explicitement à `"1"`. `Boolean("0")` vaut vrai. Avant de normaliser une ancienne fiche, vérifier si elle stocke `on`, une formule ou un fragment de macro.

## Valeurs calculées

Préférer une sortie worker dans un span ou un input readonly pour les nouveaux calculs dynamiques. Réserver un champ distinct au bonus manuel. `getAttrs` lit une chaîne d'attribut ; il n'évalue pas à lui seul une formule `@{...}` ou des dés.

Ne pas créer deux producteurs concurrents pour le même résultat. Un autocalcul historique et un worker peuvent exister dans la même fiche, mais un worker ne doit pas supposer qu'il reçoit la valeur évaluée d'un champ autocalculé. Examiner la dépendance avant de convertir ; ne pas réécrire tous les autocalculs pour une modification sans rapport.

## Contrôles ciblés

- Vide, zéro, négatif, décimal et valeur hors bornes : comportement explicite, pas de `NaN`.
- Personnage neuf et ancien : aucun défaut réappliqué abusivement.
- Miroirs : même donnée ; champs indépendants : noms distincts.
- Champ renommé : tous les consommateurs et la migration sont traités.

Contrat de lecture et événements : [Sheet Worker Scripts](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts), vérifié le 2026-11-03. Les conventions de nommage et de séparation ci-dessus sont des recommandations de conception.
