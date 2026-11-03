# Initialisation, migrations et import/export

Lire dès qu'une modification touche les données persistantes ou un import.

## Initialiser

Compléter les champs absents sans écraser saisies, zéros et exceptions. Un personnage dépourvu de version peut être ancien : ne pas l'assimiler automatiquement à une fiche neuve. Utiliser les données présentes et l'historique du schéma pour choisir le chemin.

Matérialiser les champs nécessaires au premier jet d'une ligne si le contexte l'exige. Ne pas recréer une ligne ou rétablir ses défauts à chaque ouverture.

## Migrer

Version de données du personnage distincte de la version de publication du fichier. Enchaîner les migrations dans l'ordre, attendre leurs écritures et enregistrer la nouvelle version après réussite. Une migration rejouée ne doit ni doubler les valeurs ni perdre les données.

Renommer attribut, section ou bouton public peut affecter anciennes fiches, token actions et liens de chat. Prévoir correspondance, compatibilité ou rupture annoncée. Ne pas migrer des données sans rapport avec la demande.

Avant un changement risquant d'effacer des données, garder une copie récupérable et un personnage d'essai représentatif. Préserver les champs manuels distincts des calculs automatiques.

## Contrat d'import

| Mode | Effet |
| --- | --- |
| Ajouter | Nouvelles lignes ; un second import peut créer des doublons |
| Fusionner | Réutilisation selon une clé stable explicitée |
| Remplacer | Remplacement d'un périmètre clairement défini |

Avant toute suppression ou écriture : parser le JSON, vérifier format/version, types, champs autorisés, bornes, volume et relations. Un simple `JSON.parse` réussi ou une version de bon type ne valide pas le contenu.

Préparer les données finales avant de remplacer les anciennes. Table ancien ID→nouvel ID si des lignes se réfèrent entre elles ; restaurer l'ordre manuel lorsqu'il compte. Éviter d'utiliser des totaux importés comme nouvelles entrées autoritaires si les bases permettent de les recalculer.

Attendre les écritures, relancer calculs et état visuel, puis afficher le résultat de l'import. Une limite de lot choisie par un ancien importeur n'est pas un quota Roll20 établi.

## Export

Définir liste des données, version, sections, ordre et liens. Ne pas inclure un état de calcul transitoire comme donnée source sans raison. Expliquer les omissions. Un export est utile seulement si sa restauration a été essayée sur une copie.

## Contrôles ciblés

- Personnage ancien, partiellement rempli, sans version ; zéro préservé.
- Réouverture après migration : aucune double conversion.
- JSON invalide ou contenu incohérent : aucune mutation.
- Deux imports identiques : résultat conforme au mode choisi.
- Relations de lignes et ordre conservés, champ manuel préservé.
- Interruption/échec : pas de version finale enregistrée prématurément.

Provenance : recommandations de conception issues des limites rencontrées dans les importeurs et migrations étudiés. Primitives natives : [workers.md](workers.md), [repeating.md](repeating.md).
