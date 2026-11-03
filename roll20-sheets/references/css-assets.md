# CSS, thèmes et ressources graphiques

Lire pour mise en page, débordement, apparence ou chargement d'assets.

## Portée et cascade

Scoper les styles de fiche sous `.charsheet` et une racine propre au projet. Le chat utilise `.sheet-rolltemplate-NOM`, dans un autre contexte. Conserver explicitement les classes nécessaires en CSE. Ne pas imposer un ancêtre `.ui-dialog` sans tester la fenêtre détachée.

Avant d'ajouter `!important` : confirmer le fichier chargé, le sélecteur rendu, la propriété calculée, la règle gagnante, sa spécificité et son ordre. Une refonte ne justifie pas de retirer tous les `!important` sans examiner leur rôle.

Éviter les resets globaux donnant même largeur/hauteur à tous les spans et boutons. Les icônes, valeurs inline et champs éditables n'ont pas la même boîte.

## Colonnes rétractables

```css
.charsheet .sheet-demo-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 64px 64px;
  gap: 6px;
}
.charsheet .sheet-demo-grid > * { min-width: 0; }
.charsheet .sheet-demo-grid input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}
```

Tester texte long, zoom et différentes largeurs. Pas de largeur universelle obligatoire de 820px. Prévoir un affichage utilisable à la largeur initiale visée. Les descriptions ne doivent pas être tronquées par une hauteur fixe choisie pour un seul exemple.

Les media queries réagissent au viewport du contexte de rendu ; les container queries permettent de viser la boîte d'un conteneur déclaré. Choisir selon la structure réelle, avec test en fiche et popout. Vérifier séparément `:has`, `@container`, animations et variables : « CSS moderne » n'est pas un contrat unique.

## Thèmes

Centraliser une palette, retirer l'ancienne classe avant la nouvelle et préserver le choix manuel. Le thème du système d'exploitation, celui du VTT et celui de la fiche peuvent différer. Inspecter les marqueurs de thème rendus dans le contexte actuel ; les patrons CSE courants utilisent `body.sheet-darkmode` et un contexte chat distinct.

Déclarer les variables nécessaires dans le roll template ; elles n'héritent pas de la racine de fiche. Tester contrastes, champs readonly, focus et états réussite/échec dans chaque thème pris en charge.

## Images, polices et icônes

- Une ressource locale sur le disque du créateur n'est pas accessible aux joueurs. Utiliser une URL HTTPS de fichier, stable, avec repli.
- Une URL GitHub `blob` désigne une page, pas nécessairement une image servie directement.
- Pour une image liée à un attribut, vérifier le support et essayer URL vide, invalide et inaccessible. Ne pas traiter les pseudo-attributs avatar/token comme des champs librement modifiables ; vérifier leur contrat avant écriture.
- Fond et bordure : couleur/bordure de secours ; décoration sans interception des clics. Vérifier `border-image` sur contenu court et long.
- Placer les imports de police avant les règles ordinaires. Garder une famille de repli lisible. Ne pas appliquer automatiquement les anciens contournements Google Fonts Legacy à CSE.
- Ligature affichant « settings » au lieu d'une icône : examiner requête de police, famille, ligatures, casse et espacement. Ajouter un nom accessible au bouton.
- Les contrôles repeating sont générés : inspecter `.repcontrol`/`.itemcontrol` et le mode édition avant de les restyler.

## Conventions facultatives

Le CSS sans commentaires, non-ASCII ou emojis est un choix possible de projet, pas une règle universelle de Roll20. Appliquer uniquement une convention explicitement demandée, en conservant ses exceptions documentées. Ne pas effacer un commentaire de licence ou une URL par regex globale.

## Contrôles ciblés

- Fiche et chat, fenêtre intégrée et détachée, thèmes prévus.
- Noms longs, lignes répétées nombreuses, boutons d'édition/suppression.
- Focus visible, overlays non bloquants, assets indisponibles.
- Si politique CSS stricte : inspection textuelle des fichiers livrés, y compris styles de templates ; un résultat vide ne certifie pas la compatibilité VTT.

Cadre CSE vérifié le 2026-11-03 : [sanitization](https://help.roll20.net/hc/en-us/articles/360061735034-iFrame-and-Sanitization-Changes). Les choix de grille, jauges et largeur sont des recommandations issues du travail sur les fiches locales.
