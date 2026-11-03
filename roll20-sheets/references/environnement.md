# Environnement et compatibilité

Lire pour une création, un problème de chargement ou une migration de moteur.

## Identifier la cible

| Cible | Indices | Conséquence |
| --- | --- | --- |
| Fiche HTML/CSS CSE | Fragment HTML, workers, `legacy: false` ou réglage CSE | Utiliser les références de ce skill |
| Fiche HTML/CSS Legacy | `legacy: true`, case Legacy Sanitization cochée | Conserver les contraintes Legacy tant qu'une migration n'est pas demandée |
| Beacon | Dépendance Beacon SDK et projet web dédié | Lire la documentation SDK ; ne pas coller des workers CSE dans cette architecture |

L'absence de `sheet.json` n'établit pas le réglage de la partie. Le nom d'un jeu contenant « Beacon » ne prouve pas l'utilisation du SDK. Une version V3/V4 dans le nom ne désigne pas le moteur Roll20.

## CSE et Legacy

La documentation de migration CSE autorise notamment IDs, breakpoints, animations et HTML sémantique, avec des restrictions restantes. Les anciens textes introductifs interdisent encore plusieurs de ces éléments : appliquer le contrat du moteur visé, pas toutes les interdictions historiques à la fois. Les roll templates conservent une sanitization Legacy, même dans une fiche CSE.

En CSE, faire correspondre explicitement les classes HTML/CSS. Garder `sheet-` est possible si les deux côtés concordent ; ne pas supprimer ce préfixe globalement. Scoper les styles à la fiche et traiter le chat séparément. IDs uniques, sans ID statique dans un patron de ligne répétée.

Pour une migration : sauvegarder la paire active, changer le mode volontairement, comparer les classes et styles rendus, puis tester fiche, chat et fenêtre détachée. Aucun besoin de renommer les attributs persistants pour cette seule migration.

Source vérifiée le 2026-11-03 : [iFrame and Sanitization Changes](https://help.roll20.net/hc/en-us/articles/360061735034-iFrame-and-Sanitization-Changes).

## Trois contextes distincts

- Custom Sheet Sandbox : charger et essayer une fiche.
- Sheet Workers : calculs et événements des attributs des personnages.
- Mod/API : automatisation de campagne dans un environnement séparé.

Un aperçu HTML local sert au rendu approximatif ; il n'implémente pas les services Roll20. Le Preview de l'éditeur ne suffit pas pour les workers. Charger les fichiers, enregistrer, rafraîchir la partie et ouvrir un personnage pour la recette fonctionnelle. Voir [Intro to Sheet Development](https://help.roll20.net/hc/en-us/articles/360037773413-Intro-to-Sheet-Development), consulté le 2026-11-03 ; ses restrictions historiques doivent être recoupées avec CSE.

## Orientation Beacon

Beacon possède sa propre chaîne de développement. Identifier la version installée, les sources, le build et le modèle de données avant d'implémenter. Les chapitres CSE de ce paquet ne décrivent pas son API.

Points d'entrée : [Introduction SDK](https://roll20.github.io/beacon-docs/docs/gettingstarted/introduction/), [installation](https://roll20.github.io/beacon-docs/docs/gettingstarted/installing-beacon/), [fiches Beacon](https://github.com/Roll20/roll20-beacon-sheets). Cette V1 oriente vers Beacon ; elle ne prétend pas en couvrir toute l'implémentation.
