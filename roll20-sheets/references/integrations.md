# Paramètres et intégrations Roll20

Lire seulement pour l'intégration demandée. Ces fonctions ne sont pas des prérequis à une fiche simple.

## Paramètres de campagne

`sheet.json` peut déclarer `useroptions`. L'option désigne un attribut sans préfixe `attr_`, un type de contrôle, des libellés et une valeur initiale. Séparer valeur technique et traduction.

Un changement de valeur par défaut ne migre pas automatiquement les personnages existants. Prévoir une action explicite si le produit doit appliquer les nouveaux réglages à des données déjà créées. Ne pas écraser les choix individuels à chaque `sheet:opened`.

Source vérifiée le 2026-11-03 : [Default Sheet Settings](https://help.roll20.net/hc/en-us/articles/360041542554-Default-Sheet-Settings).

## Compendium

Déclarer la compatibilité par le champ `compendium` approprié dans `sheet.json`, ou par le réglage de la partie pour une fiche personnalisée. Examiner le schéma réel de l'entrée à importer.

```html
<fieldset class="repeating_objets">
  <div class="compendium-drop-target">
    <input type="text" name="attr_nom" accept="Name">
    <input type="text" name="attr_categorie" accept="Category">
  </div>
</fieldset>
```

Les valeurs de `accept` doivent correspondre aux propriétés du compendium choisi ; `Name` et `Category` ne promettent pas un schéma universel. Examiner les données reçues avant de construire des traitements complémentaires. Si plusieurs champs arrivent, ne pas supposer que le premier changement signifie que tout le dépôt est terminé.

Source vérifiée le 2026-11-03 : [Compendium Integration](https://help.roll20.net/hc/en-us/articles/360043790493-Compendium-Integration).

## Token par défaut

`setDefaultToken` est une fonction spécialisée du workflow de dépôt compendium. Vérifier les propriétés admises et les événements documentés. Ce n'est pas un accès général à tous les tokens de campagne. Voir [Sheet Worker Scripts](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts).

## Charactermancer

L'assistant de création possède ses étapes, état temporaire, événements et fonctions dédiés. Avant implémentation, lire le cycle de vie, les slides, la sortie et la reprise dans la [documentation Charactermancer](https://help.roll20.net/hc/en-us/articles/360037257394-Charactermancer), consultée le 2026-11-03.

Séparer les choix temporaires de leur application finale. Tester retour arrière, annulation, reprise, données manquantes et application finale répétée. Vérifier aussi les règles de contribution si la fiche doit être soumise publiquement. Cette référence est une orientation, pas un manuel complet de l'API Charactermancer.

## Scripts Mod/API

`sendChat`, accès aux objets de campagne et modification d'une autre cible relèvent d'un environnement distinct des Sheet Workers. Une commande `!nom` suppose le script correspondant et ses permissions ; documenter la dépendance et son comportement absent.

Une écriture d'attribut par un Mod peut nécessiter un mécanisme adapté pour déclencher les workers. Examiner le contrat actuel de l'API et du type de fiche, notamment pour Beacon. Ne pas supposer qu'un appel de données reproduit les événements d'une saisie UI.

Pour une implémentation Mod, consulter les points d'entrée de [sources.md](sources.md). Ce skill couvre la frontière avec les fiches ; il ne fournit pas une API de campagne fictive dans le worker.

## Contrôles ciblés

- Défauts sur personnage neuf et maintien des choix sur personnage existant.
- Dépôt d'une entrée complète, incomplète et incompatible ; noms de propriétés réels.
- Aucun écrasement prématuré sur événement partiel.
- Intégration absente ou permission manquante : comportement explicite.
- Charactermancer : annulation sans mutation finale indésirable, application sans doublon.
