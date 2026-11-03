---
name: roll20-sheets
description: Créer, modifier, déboguer et vérifier des fiches de personnage Roll20 HTML/CSS avec Sheet Workers, sections répétées, macros et roll templates. Utiliser pour les fiches CSE ou Legacy ; pour Beacon, consulter la référence d'orientation avant de choisir une autre architecture.
---

# Fiches Roll20

Travailler sur le besoin demandé, en préservant les données des personnages et les règles du jeu. Ce skill fournit des procédures et des références ciblées ; il ne remplace pas les instructions du projet.

## Commencer

1. Identifier les fichiers effectivement utilisés : sources ou sorties de build, HTML/CSS, `sheet.json` et traductions éventuelles. Écarter les sauvegardes et variantes non concernées.
2. Déterminer le moteur : CSE, Legacy ou Beacon. Si le dépôt ne suffit pas, indiquer l'incertitude et vérifier le réglage réellement chargé avant une décision dépendante du mode.
3. Repérer les attributs, événements, macros et sélecteurs concernés par recherche ciblée. Lire leurs producteurs et consommateurs, pas toutes les fiches du dépôt.
4. Lire seulement les références utiles ci-dessous. Pour une création, commencer par environnement, données et HTML, puis ajouter les sujets nécessaires. Pour un correctif, suivre la cause et ses dépendances.

## Choisir les références

Tous les chemins sont relatifs au dossier de ce skill. Une ligne indique quand lire un fichier, pas une obligation de tout charger.

| Besoin | Référence |
| --- | --- |
| Mode, chargement, migration Legacy/CSE, orientation Beacon | [environnement.md](references/environnement.md) |
| Attributs, vide/zéro, valeurs calculées | [donnees.md](references/donnees.md) |
| Contrôles HTML, structure, formulaires | [html.md](references/html.md) |
| Calculs, événements, asynchronisme, lenteur | [workers.md](references/workers.md) |
| Lignes répétées, identité, ordre, agrégats | [repeating.md](references/repeating.md) |
| Onglets, panneaux, jauges, `$20` | [interface.md](references/interface.md) |
| Mise en page, thèmes, images, polices | [css-assets.md](references/css-assets.md) |
| Boutons, dés, queries, confidentialité, CRP | [jets-macros.md](references/jets-macros.md) |
| Rendu chat, conditions, résultats calculés | [roll-templates.md](references/roll-templates.md) |
| PV, coûts, repos, dégâts | [ressources.md](references/ressources.md) |
| Bonus, plafonds, parseurs, dépendances métier | [moteurs-regles.md](references/moteurs-regles.md) |
| Renommage, anciennes données, import/export | [migrations-import.md](references/migrations-import.md) |
| Traductions, clavier, accessibilité, impression | [i18n-accessibilite.md](references/i18n-accessibilite.md) |
| Compendium, paramètres de campagne, Charactermancer, Mod/API | [integrations.md](references/integrations.md) |
| Soumission au dépôt communautaire | [publication.md](references/publication.md) |
| Cause d'un symptôme encore inconnue | [diagnostic.md](references/diagnostic.md) |
| Choix des contrôles et recette de livraison | [validation.md](references/validation.md) |
| Fonction non couverte, doute de compatibilité, source à actualiser | [sources.md](references/sources.md) |

## Invariants communs

- Un nom d'attribut persistant est un contrat de données. Le renommer demande d'examiner les anciens personnages, macros et intégrations.
- Une ouverture ou un recalcul ne doit pas réinitialiser une dépense ou un choix manuel. Distinguer absent, vide et zéro.
- Le worker n'est pas un script de page web ni un script Mod/API de campagne. Ne pas inventer de fonction native ou de capacité DOM.
- Une option d'affichage n'est pas une permission ; une valeur affichée dans le chat n'est pas une modification des réserves.
- Distinguer règle documentée, recommandation de conception et convention de projet. Le nombre de fiches utilisant une technique ne prouve ni sa validité ni une limite de plateforme.
- Appliquer les conventions locales et leurs exceptions explicites. Les règles CSS « ASCII uniquement » ou « sans commentaires » ne sont pas imposées par ce skill public.

## Modifier et vérifier

Garder un état récupérable avant une modification importante. Adapter le périmètre au besoin ; ne pas transformer une réparation en refonte générale.

Sélectionner les contrôles de la référence concernée et de [validation.md](references/validation.md). Si Python 3.10+ est disponible, le vérificateur facultatif [check_sheet.py](scripts/check_sheet.py) contrôle les fichiers explicitement passés sans les modifier ; consulter `--help` pour ses options. Il ne certifie pas le fonctionnement dans Roll20.

Conclure avec les fichiers changés, le comportement obtenu, les contrôles réellement exécutés et les essais Roll20 restant à faire. Ne pas annoncer un test en partie sur la seule base d'une lecture ou d'un contrôle syntaxique.

## Compléter une lacune

Ouvrir la source officielle correspondant au sujet, vérifier son moteur et sa portée, puis ajouter une règle courte dans la bonne référence avec URL et date de consultation. En cas de contradiction documentaire, conserver la nuance et prévoir un essai minimal. Sans accès à la source ou au VTT, signaler ce qui reste à confirmer plutôt qu'inventer un contrat.
