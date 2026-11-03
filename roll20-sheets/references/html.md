# Structure HTML et contrôles

Lire quand la structure ou un contrôle de fiche change.

Livrer un fragment, sans document englobant `DOCTYPE`/`html`/`head`/`body` ni formulaire imbriqué. Le CSS va dans la sortie CSS. Le JS de fiche va dans un bloc `script` de type `text/worker` ; un fichier JS source séparé nécessite un build qui l'intègre. Ne pas inventer d'exécution par `onclick` ou script externe.

```html
<div class="sheet-demo">
  <label>Force <input type="number" name="attr_force" value="0"></label>
  <button type="roll" name="roll_test"
    value="&{template:default} {{name=Test}} {{resultat=[[1d20+@{force}]]}}">Tester</button>
</div>
```

Placer les templates puis le bloc worker après les contrôles est un choix de livraison pratique. Une fiche sans logique JS n'a pas besoin d'un worker vide ; si elle en contient, regrouper ses workers dans un seul bloc en résolvant les collisions de noms.

## Contrôles

- `name="attr_..."` assure la liaison ; un ID seul ne sauvegarde pas.
- Select : valeurs techniques explicites et stables, libellés traduisibles.
- Radios : même attribut, valeurs distinctes, un seul défaut coché.
- Texte multiligne : textarea. Un placeholder ne remplace pas un libellé.
- `type="action"` correspond à un événement `clicked:...` ; `type="roll"` porte une commande de chat.
- IDs uniques ; éviter les IDs dans les patrons répétables. Envelopper une saisie dans son label permet de ne pas dépendre de `for`/`id`.
- Tables pour données tabulaires, Grid/Flex pour mise en page.

## Filtrage

Identifier CSE/Legacy avant de diagnostiquer un élément supprimé : [environnement.md](environnement.md). L'ancien guide interdisait globalement `section`, `header` et `footer` ; la documentation CSE annonce le support de HTML sémantique. Utiliser des conteneurs simples si la compatibilité est inconnue, sans transformer cette prudence en interdiction universelle.

Si un nom ou un élément disparaît, inspecter le DOM après chargement et réduire au cas minimal. Les listes historiques de sous-chaînes filtrées ne doivent pas déclencher un renommage massif sans reproduction. Une classe contenant `eval` n'est pas une preuve suffisante d'un bug CSE.

## Contrôles ciblés

- Persistance après fermeture/réouverture.
- Bouton lié au bon événement ou à la bonne macro.
- Labels, focus et saisie clavier utilisables.
- Pas d'ID statique dupliqué en répétition ; pas d'injection de formulaire/document complet.
- Structure testée dans le mode réel, y compris le chat si un template change.

Sources vérifiées le 2026-11-03 : [Intro](https://help.roll20.net/hc/en-us/articles/360037773413-Intro-to-Sheet-Development), [CSE](https://help.roll20.net/hc/en-us/articles/360061735034-iFrame-and-Sanitization-Changes), [workers](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts). Voir environnement pour leurs différences de portée.
