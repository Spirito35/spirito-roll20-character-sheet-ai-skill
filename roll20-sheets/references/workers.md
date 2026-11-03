# Sheet Workers

Lire pour calcul, événement, asynchronisme ou performance.

## Contrat utile

| API / événement | Usage |
| --- | --- |
| `on(events, callback)` | Abonnements ; plusieurs événements séparés par des espaces |
| `getAttrs(names, callback)` | Lecture asynchrone |
| `setAttrs(values, options?, callback?)` | Écriture asynchrone ; attendre le callback avant une lecture dépendante |
| `{silent: true}` | Évite la propagation des événements `change` correspondants |
| `sheet:opened` | Reconstruction / initialisation conservatrice |
| `change:nom` | Changement d'attribut |
| `eventInfo` | Source, type, anciennes/nouvelles valeurs selon événement ; données supprimées sur `remove` |

Les noms d'événements sont en minuscules ; `sourceAttribute` peut perdre la casse du RowID. Les variations `change:x` et `change:x_max` peuvent toutes deux intervenir : lire les données nécessaires et rendre le calcul idempotent.

Les variables globales mutables du worker ont une portée par joueur, pas par personnage. Elles ne constituent ni une réserve persistante ni un verrou universel de personnage. Constantes et fonctions pures peuvent rester globales.

Source vérifiée le 2026-11-03 : [Sheet Worker Scripts](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts).

## Organiser les calculs

Lire ensemble les entrées d'un calcul, calculer depuis les bases, puis regrouper les écritures. Ne pas imposer « un seul getAttrs pour toute la fiche » : la découverte d'IDs ou d'une dépendance indirecte peut nécessiter une étape préalable.

```js
const recalcDefense = () => {
  getAttrs(["agilite", "armure_bonus", "defense"], values => {
    const number = value => Number.isFinite(Number(value)) ? Number(value) : 0;
    const next = 10 + number(values.agilite) + number(values.armure_bonus);
    if (String(values.defense) !== String(next)) {
      setAttrs({ defense: next }, { silent: true });
    }
  });
};
on("sheet:opened change:agilite change:armure_bonus", recalcDefense);
```

Cet exemple ne déclenche pas un calcul aval sur `change:defense`. Si une jauge ou une macro en dépend, l'inclure dans l'orchestration ou choisir explicitement la propagation par événements.

Deux stratégies valables : propagation A→B→C par événements, ou orchestration explicite de B et C depuis les entrées. Documenter le choix local. Un `silent` ajouté isolément peut casser une dépendance. Un filtre systématique `sourceType !== "sheetworker"` peut faire de même.

## Ouverture et concurrence

- Un recalcul ne double pas un bonus ; repartir des données sources.
- `sheet:opened` reconstruit l'affichage et complète les absences, sans soigner ni recréer systématiquement des lignes.
- Attendre les écritures ou les groupes de calculs nécessaires avant de publier un total. Un délai arbitraire ne garantit pas leur achèvement.
- Tester deux clics rapprochés et plusieurs personnages. Un enchaînement de callbacks n'est pas une transaction entre plusieurs joueurs.
- Réduire les timers, caches et callbacks détachés du contexte natif. Des montages communautaires utilisent `getActiveCharacterId` et des messages internes ; ce skill ne les fournit pas comme API publique garantie. Examiner le framework/version et faire un essai multi-personnages avant d'en dépendre.

## Diagnostic et performance

Tracer temporairement domaine, événement, RowID, entrées et sorties. Un `try/catch` autour de l'appel asynchrone ne capture pas automatiquement les erreurs de son callback. Retirer les logs bruyants après diagnostic.

Mesurer les appels et écritures avant d'optimiser. Réduire abonnements trop larges, cascades inutiles et écritures de valeurs identiques. Calculer seulement les dépendants d'une entrée modifiée ; préférer une action de validation à un gros parseur relancé à chaque frappe si l'usage le permet.

## Contrôles ciblés

- Même entrée, même résultat après deux recalculs.
- Mise à jour immédiate des consommateurs, y compris après écriture silencieuse.
- Ouverture d'un personnage ancien sans perte de réserve ou de choix.
- Suppression et collection vide si le calcul dépend de repeating.
- Pas de fuite de cache ou de coût entre personnages ; pas de promesse de sécurité multi-client non testée.
