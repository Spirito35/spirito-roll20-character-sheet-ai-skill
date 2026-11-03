# Ressources, coûts, repos et dégâts

Lire pour PV, réserves, dépenses et récupération. Les choix mécaniques ci-dessous appartiennent au jeu, pas à Roll20.

## Courant et maximum

Définir minimum, maximum, dépassement éventuel, initialisation et effet d'un changement de maximum.

| Politique | 7/10 avec nouveau maximum 15 |
| --- | --- |
| Conserver le courant | 7/15 |
| Conserver la quantité manquante | 12/15 |
| Conserver la proportion | 10,5/15, puis règle d'arrondi |
| Remplir | 15/15 |

Tester également baisse du maximum et maximum nul. Ne pas convertir un calcul de plafond en soin involontaire. Une réserve zéro est une valeur valide. Le taux de récupération peut être indépendant du maximum.

## Dépense

Identifier personnage et ligne, lire réserves/coûts/conditions, valider, puis exécuter selon la règle prévue. Insuffisance : retour compréhensible et absence de dépense. Coût négatif : rejeter ou traiter comme gain explicitement ; une soustraction brute peut créer des ressources.

Définir quand prélever : avant le jet, après succès ou à la confirmation. Ne pas consommer sur un simple changement de réglage. Ordonner les écritures et la finalisation CRP avec les callbacks requis.

Deux clics rapides peuvent lire la même valeur avant les écritures. Une protection locale réduit les répétitions d'un client mais ne crée pas une transaction entre joueurs. Ne pas promettre d'atomicité avec un booléen global de worker. Tester les scénarios réellement possibles.

## Repos

Table explicite : ressource, type de repos, formule de récupération, plafond, conditions retirées. Des valeurs stables comme `short`/`long` facilitent l'internationalisation ; un repos long n'inclut les effets du court que si le système le prévoit.

Réinitialiser une confirmation temporaire après usage ; distinguer affichage de confirmation et exécution de l'opération. La réouverture de fiche ne doit pas rejouer le dernier repos.

## Dégâts et ressources personnalisées

Séparer dégâts calculés, publiés dans le chat, appliqués à soi et appliqués à une cible. Une carte de chat n'écrit pas les réserves. Pour une cible distincte, lire [integrations.md](integrations.md) et vérifier l'automatisation et les permissions nécessaires.

Conserver les étapes utiles : base, esquive, protection, résistance, absorption, réserve. Un affichage intermédiaire permet de retrouver une erreur d'ordre des opérations.

Une ressource personnalisée conserve ses données dans la ligne source. Une barre compacte doit référencer le RowID, pas la position. Suppression, ordre et limite d'emplacements : [repeating.md](repeating.md).

## Contrôles ciblés

- Réserve vide, zéro, insuffisante, suffisante, dépassement et maximum nul.
- Hausse/baisse du plafond sans récupération involontaire.
- Clics rapprochés, réouverture et changement de personnage.
- Repos de chaque type et exceptions manuelles préservées.
- Attribut effectivement modifié, au-delà de la seule carte de chat.

Provenance : règles de conception dégagées des fiches locales ; primitives asynchrones dans [workers.md](workers.md) et CRP dans [jets-macros.md](jets-macros.md).
