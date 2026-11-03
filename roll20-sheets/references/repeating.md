# Sections répétées

Lire pour inventaires, listes, agrégats et actions de ligne.

## Structure et identité

```html
<fieldset class="repeating_inventaire">
  <label>Objet <input type="text" name="attr_nom"></label>
  <label>Quantité <input type="number" name="attr_quantite" value="1" min="0"></label>
  <label>Poids <input type="number" name="attr_poids" value="0" min="0" step="0.1"></label>
</fieldset>
```

Le nom sauvegardé devient `repeating_inventaire_<RowID>_poids`. Choisir un nom de section sans underscore interne après `repeating_`. Préserver les noms historiques jusqu'à une migration explicite. Les relations parent/enfant utilisent des collections liées par IDs, pas des sections imbriquées.

RowID = identité durable ; `$0` = position. Ne pas employer la position comme référence persistante à une arme ou ressource.

| Besoin | API / événement |
| --- | --- |
| Énumérer les IDs | `getSectionIDs("repeating_inventaire", callback)` |
| Écouter quantité | `change:repeating_inventaire:quantite` |
| Écouter section | `change:repeating_inventaire` |
| Suppression | `remove:repeating_inventaire` |
| Bouton de ligne | `clicked:repeating_inventaire:utiliser` |
| Ordre modifié | `change:_reporder:inventaire` |
| Créer un ID | `generateRowID()` puis écrire les attributs complets |
| Supprimer | `removeRepeatingRow("repeating_inventaire_" + id)` |

Sources vérifiées le 2026-11-03 : [workers](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts), [structure](https://help.roll20.net/hc/en-us/articles/360037773413-Intro-to-Sheet-Development).

## Agrégat minimal

```js
const recalcPoids = () => {
  getSectionIDs("repeating_inventaire", ids => {
    if (!ids.length) {
      setAttrs({ poids_total: 0 }, { silent: true });
      return;
    }
    const fields = ids.flatMap(id => [
      `repeating_inventaire_${id}_quantite`, `repeating_inventaire_${id}_poids`
    ]);
    getAttrs(fields, values => {
      const nonnegative = (value, fallback) => {
        if (value == null || String(value).trim() === "") return fallback;
        const parsed = Number(value);
        return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback;
      };
      const total = ids.reduce((sum, id) => {
        const prefix = `repeating_inventaire_${id}_`;
        return sum + nonnegative(values[prefix + "quantite"], 1)
          * nonnegative(values[prefix + "poids"], 0);
      }, 0);
      setAttrs({ poids_total: Math.round(total * 100) / 100 }, { silent: true });
    });
  });
};
on("sheet:opened change:repeating_inventaire:quantite " +
   "change:repeating_inventaire:poids remove:repeating_inventaire", recalcPoids);
```

Choix métier de cet exemple : quantité zéro permise, poids non négatif, arrondi à deux décimales. Adapter ces choix au jeu. Si le total alimente une autre sortie, orchestrer son recalcul après l'écriture silencieuse.

## Extraire et retrouver une ligne

Inspecter le vrai `eventInfo` de l'action. Enlever le préfixe de section et le suffixe exact du champ/action ; éviter une regex gloutonne ou des indices fixes liés à la longueur du nom. Retrouver la casse canonique par `getSectionIDs` si nécessaire. Sur `remove`, `sourceAttribute` désigne la ligne, sans suffixe de champ, et `removedInfo` peut fournir les valeurs supprimées.

Créer une ligne par `generateRowID` + `setAttrs` de ses champs explicites. Ne pas dépendre d'un événement `add:repeating_*` non établi dans le contrat utilisé. Recalculer après le callback d'écriture si la création l'exige.

## Ordre, miroirs et projections

`getSectionIDs` ne garantit pas l'ordre manuel. Lire `_reporder_repeating_inventaire`, retenir les IDs encore présents, puis compléter avec les IDs absents de cet ordre selon une politique déterministe. Garder les IDs canoniques.

Pour deux vues d'une même collection, conserver nom de section et noms d'attributs ; différencier les classes d'affichage. Tester ajout, édition, suppression et ordre depuis chaque vue. Le DOM généré (`.repcontainer`, `.repitem`) peut différer du fieldset source.

Projection vers des emplacements fixes : stocker la correspondance emplacement→RowID, effacer un emplacement dont la ligne disparaît, annoncer la limite d'affichage. Une limite locale de dix barres n'est pas une limite Roll20. Une synchronisation aller-retour nécessite une source autoritaire et une prévention de boucle.

## Contrôles ciblés

- Ajouter, modifier, déplacer, supprimer, puis supprimer la dernière ligne.
- Cliquer une action après réorganisation : même RowID ciblé.
- Tester deux lignes de même nom et une ligne neuve sans saisie préalable.
- Refaire le test sur ancien personnage et vues miroirs, si présentes.
- Traiter les liens vers une ligne supprimée ou recréée par import.
