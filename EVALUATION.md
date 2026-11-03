# Évaluer le skill sur de vraies tâches

Ce protocole permet de comparer Codex et Claude Code, avec puis sans le skill, sur une copie des mêmes fichiers. Il n'affirme pas que ces sessions ont déjà été exécutées.

Utiliser le même modèle, la même demande et les mêmes fichiers au départ. Conserver les versions et le journal des fichiers lus. Examiner le résultat et les essais réellement exécutés ; un changement de style de réponse n'est pas une mesure d'efficacité.

## Cas 1 — CSS ciblé

Demande : « Le nom d'une arme déborde de sa colonne quand il est long. Corrige la mise en page de cette section. »

Attendu : identification des sélecteurs concernés, correction de leur contrainte de largeur, contrôle des autres champs de la ligne. Aucune migration des attributs ou réécriture des jets sans dépendance démontrée. La lecture de toutes les références publication/import n'est pas utile.

## Cas 2 — Agrégat de repeating

Demande : « Le total de poids reste incorrect après suppression de la dernière ligne. Corrige ce comportement. »

Attendu : examen de l'abonnement à suppression et de la branche collection vide ; total neutre après dernière suppression ; propagation vers les sorties dépendantes. Les règles de quantité propres au jeu restent préservées. Un audit de tout le CSS n'est pas nécessaire.

## Cas 3 — Import qui efface trop tôt

Demande : « Un JSON syntaxiquement correct mais incomplet vide l'inventaire. Corrige l'import en conservant son mode de remplacement. »

Attendu : validation du contenu avant mutation, périmètre de remplacement conservé, anciennes données préservées en cas de rejet, contrôle des relations entre lignes et de l'import répété. Ne pas résoudre le problème en supprimant silencieusement la fonction de remplacement.

## Cas 4 — Création minimale

Demande : « Crée une fiche CSE avec Force, PV actuels/max, inventaire quantité/poids et un jet d20 + Force. »

Attendu : livrables HTML/CSS adaptés à Roll20, attributs cohérents, total d'inventaire maintenu après suppression, réserve à zéro conservée à la réouverture, jet natif. Éviter un framework, Charactermancer ou une dépendance API sans besoin.

## Cas 5 — Piège de compatibilité

Demande : « Cette fiche est Beacon et utilise déjà son SDK. Ajoute une action au bon endroit. »

Attendu : repérage du SDK/version, consultation de sa documentation et de l'architecture existante. Aucun collage de `script type="text/worker"` présenté comme solution Beacon.

## Relever les résultats

| Mesure | À consigner |
| --- | --- |
| Correction | Scénario initial résolu ; sorties attendues |
| Régression | Données, consommateurs et cas voisins conservés |
| Sources | Contrat vérifié lorsque nécessaire, incertitudes explicites |
| Lectures | Fichiers et passages réellement chargés, y compris code de fiche |
| Coût | Tokens mesurés par l'outil si disponibles ; sinon caractères lus, clairement étiquetés |
| Temps | Durée de la session et intervention humaine nécessaire |
| Limites | Contrôles locaux vs tests VTT, dépendances absentes |

Un chargement court qui manque une dépendance importante n'est pas une réussite. Pour un résultat durable, rejouer les scénarios après chaque changement substantiel du skill et corriger uniquement les instructions responsables d'un échec observé.
