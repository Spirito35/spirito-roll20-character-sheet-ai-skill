# Vérification proportionnée à la modification

Lire à la préparation des contrôles ou avant livraison. Un audit complet explicite couvre tous les domaines applicables ; un correctif courant couvre son périmètre et les dépendances touchées.

## Socle commun

- [ ] Fichiers actifs et mode identifiés ; état récupérable disponible si nécessaire.
- [ ] Comportement attendu décrit avec un exemple d'entrée/sortie.
- [ ] Attributs et consommateurs concernés examinés ; anciennes données préservées.
- [ ] Contrôles locaux pertinents exécutés et résultats examinés.
- [ ] Scénario de la modification et cas voisins essayés dans Roll20, ou explicitement signalés comme restant à faire.
- [ ] Bilan exact : changements, vérifications, limites.

## Choisir la recette

| Modification | Scénarios utiles |
| --- | --- |
| Saisie/calcul | Vide, zéro, négatif, limite, nouveau/ancien personnage |
| Repeating | Ajout, édition, ordre, suppression, dernière ligne |
| Bonus/dépendances | Ajouter puis retirer une source, changer choix et valeur |
| Réserve/coût | Max zéro, hausse/baisse, insuffisance, double clic |
| Jet/template | Normal, avantage, désavantage, égalité, critique, propriété absente |
| Confidentialité | Auteur, MJ et autre joueur ; préfixe réel |
| Interface/CSS | Fenêtre intégrée/détachée, largeur, zoom, clavier, thèmes |
| Traduction | Clés statiques/dynamiques, deux langues si prévues |
| Migration/import | Ancien/incomplet, répétition, données invalides sans mutation |
| Intégration | Dépendance absente, mauvais type d'entrée, permissions |
| Impression | Fiche courte/longue, onglets et notes inclus |
| Publication | Manifeste, aperçu, fichiers, exigences actuelles |

Ne pas cocher les essais non exécutés. Utiliser `validé localement`, `validé dans Roll20`, `non applicable` avec raison ou `à tester`. Les checklists des références précisent les invariants du sujet ; inutile de les recopier dans un rapport de plusieurs pages pour une petite correction.

## Vérificateur facultatif

Depuis le dossier du skill, Python 3.10+ :

```text
python scripts/check_sheet.py --html /chemin/fiche.html --css /chemin/fiche.css
python scripts/check_sheet.py --sheet-json /chemin/sheet.json --translation /chemin/translation.json
```

Un `sheet.json` fournit ses chemins HTML/CSS lorsqu'ils ne sont pas passés explicitement. Les chemins relatifs du manifeste sont résolus depuis son dossier. Le script lit les fichiers ; il ne modifie rien et n'exécute aucun worker.

Contrôles : UTF-8, JSON strict, type de `legacy`, fichiers déclarés, structure HTML dangereuse, nombre de blocs workers, IDs dupliqués/historiques, liaisons élémentaires, clés i18n statiques et correspondance des noms de templates littéraux. Les warnings nécessitent examen, pas suppression automatique.

Options `--css-ascii` et `--css-no-comments` uniquement si le projet adopte ces conventions. Elles détectent des indices textuels, pas un langage CSS complet ni tous les emojis encodés. Aucune option n'autorise une suppression automatique.

Code de sortie : 0 sans erreur bloquante détectée (warnings possibles), 1 erreurs détectées, 2 usage incorrect. Utiliser `--json` pour un résultat structuré. Ces codes ne certifient jamais le rendu, les événements ou les règles métier dans Roll20.

## Autres vérifications

Un parseur JS peut vérifier la syntaxe du bloc worker extrait ; compter les accolades ne suffit pas. Un linter HTML généraliste peut méconnaître `type="roll"`, `type="action"` et `rolltemplate` : adapter l'outil avant d'appliquer ses corrections.

Sous PowerShell, lire les fichiers avec `Get-Content -Encoding UTF8`. Rechercher des fonctions/attributs stables plutôt que des numéros de ligne mémorisés. Un test local simulant `getAttrs` ne valide pas la plateforme réelle.

## Consigner un problème utile

```text
Date / fiche / version :
Fichiers et mode réellement chargés :
Scénario et valeurs initiales :
Attendu / observé :
Cause et repère de code :
Correctif / essais exécutés :
Statut : hypothèse, confirmé dans le code, confirmé dans Roll20
```

Garder l'historique propre au projet hors des instructions communes. Ajouter au skill une leçon courte seulement si elle aide une prochaine tâche ; ne pas accumuler tous les anciens incidents dans l'entrée principale.
