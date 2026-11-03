# Roll templates

Lire pour cartes de chat, helpers, critiques ou thème de résultat.

## Contrat des noms

```text
&{template:demo}
<rolltemplate class="sheet-rolltemplate-demo">
.sheet-rolltemplate-demo { ... }
```

Faire correspondre les trois noms. Employer des guillemets doubles dans les attributs HTML des templates. Conserver leur préfixage `sheet-` et leurs contraintes Legacy même si la fiche est CSE. Le chat ne descend pas de la racine `.charsheet` : palette et styles nécessaires doivent y être définis.

## Helpers

| Forme | Sens |
| --- | --- |
| `{{#description}}...{{/description}}` | Propriété présente / exploitable comme condition |
| `{{^description}}...{{/description}}` | Branche d'absence |
| `{{#rollTotal() jet 10}}...{{/rollTotal() jet 10}}` | Total égal |
| `rollGreater()` / `rollLess()` | Comparaison stricte |
| `rollBetween()` | Intervalle inclusif |
| `rollWasCrit()` / `rollWasFumble()` | Marqueurs de critique/échec du jet |
| `{{#allprops() name attaque}}...{{/allprops() name attaque}}` | Propriétés restantes, en excluant `name` et `attaque` |

Dans `allprops`, utiliser `{{key}}` et `{{value}}`. Les paramètres sont une liste d'exclusions, pas la liste des propriétés à inclure. Répéter les arguments à la fermeture du helper.

Helpers numériques : passer un inline roll approprié, et séparer les résultats devant être comparés indépendamment. Existence d'une propriété, zéro numérique et texte vide sont trois notions distinctes. Préférer un indicateur d'affichage séparé du nombre.

Pour CRP, employer `computed::nom` pour les résultats calculés. Ne pas supposer que remplacer seulement l'affichage remplace aussi toutes les conditions de critique.

Source vérifiée le 2026-11-03 : [How to Make Roll Templates](https://help.roll20.net/hc/en-us/articles/360037257334-How-to-Make-Roll-Templates). Détails CRP : [jets-macros.md](jets-macros.md).

## Avantage, égalités et dégâts

Si deux résultats sont comparés, traiter premier supérieur, second supérieur et égalité. Utiliser le résultat retenu pour réussite, critique, confirmation et dégâts supplémentaires. Barrer le résultat rejeté ne l'exclut pas automatiquement des autres conditions.

Une propriété `{{degats=...}}` n'applique pas ces dégâts à une réserve. Une liste limitée à vingt attaques ou trente objets est un choix de générateur/template, pas un quota universel. Modifier producteur, template et styles ensemble si cette limite change.

## Liens et descriptions

Omettre les liens dont l'ID manque : `[Nom]()` est une chaîne non vide, pas une absence de lien. Un lien vers le journal n'accorde pas de permission. Une carte descriptive n'a pas besoin de dés.

Tester texte long et multilignes, noms localisés, largeur de chat, classes des inline rolls et thèmes. Une carte déjà publiée ne devient pas un composant DOM éditable par le worker.

## Contrôles ciblés

- Les trois noms concordent, blocs et fermetures aussi.
- Chaque comparaison reçoit le bon résultat ; égalités et critiques cohérentes.
- `allprops` exclut les propriétés prévues, sans fuite de champs techniques.
- Affichage sans propriété facultative et sans dés utilisable.
- Styles et variables du chat autonomes ; permissions des liens vérifiées.
