# Publication d'une fiche

Lire pour une soumission au dépôt communautaire. Une diffusion de ce skill est distincte d'une soumission de fiche à Roll20.

## Livrable

Vérifier les exigences actuelles avant soumission : [Minimum Requirements](https://help.roll20.net/hc/en-us/articles/360037773453-Minimum-Requirements-Best-Practices) et [README du dépôt](https://github.com/Roll20/roll20-character-sheets/blob/master/README.md), consultés le 2026-11-03.

Préparer HTML, CSS, `sheet.json`, aperçu et traductions utiles. Les noms de fichier et leur casse doivent correspondre. JSON strict, `legacy` booléen, fins de ligne LF pour les fichiers soumis. Les fichiers générés doivent pouvoir être reproduits depuis les sources si le projet utilise un build.

```json
{
  "html": "mon-jeu.html",
  "css": "mon-jeu.css",
  "authors": "Nom du contributeur",
  "roll20userid": "ID du contributeur",
  "preview": "preview.png",
  "instructions": "Description de la fiche et de ses commandes.",
  "legacy": false
}
```

Cet exemple est un schéma à renseigner, pas des métadonnées prêtes à soumettre. Ne pas reprendre l'identité du créateur d'une fiche d'exemple.

## Qualité de contribution

Tester les fonctionnalités usuelles, les anciens personnages et les navigateurs demandés. Garder une interface lisible au redimensionnement ; les tables servent aux données tabulaires. Si un champ de genre est fourni, le guide de contribution demande une saisie libre.

Déclarer les dépendances et assurer le fonctionnement de base selon les exigences du dépôt. Préserver les attributions et examiner les droits des contenus réemployés. Le statut « officiel » ne découle pas d'un nom de dossier. Pour création/avancement guidés et contenu de règles, consulter les restrictions actuelles plutôt que déduire une autorisation d'une fiche existante.

## Assistance IA

La [politique Roll20](https://help.roll20.net/hc/en-us/articles/43164327041943-AI-Policy-for-Community-Mod-Scripts-Character-Sheets), consultée le 2026-11-03, distingue technique, texte et visuels dans les canaux concernés. Lire la version actuelle avant la contribution ; l'assistance au code ne dispense pas de vérifier la qualité et les droits. Ne pas généraliser cette politique à un autre canal de publication.

## Contrôles ciblés

- Manifeste et fichiers correspondants, aperçu réel, identité correcte.
- Compatibilité des anciennes données, commandes et token actions.
- Recette réelle consignée ; aucun « testé » fondé seulement sur un parseur.
- Sources, attribution et dépendances identifiables.
- Exigences de soumission relues au moment de la PR ; ne pas promettre un délai de traitement.
