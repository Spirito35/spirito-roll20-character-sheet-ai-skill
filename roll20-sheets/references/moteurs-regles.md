# Moteurs de règles et dépendances

Lire pour bonus, caractéristiques sélectionnables, plafonds ou mini-langages métier.

## Graphe utile

Avant modification, suivre entrées brutes → contributions → totaux → affichages / macros / ressources. Relever les événements qui relancent chaque étape, les suppressions de lignes, et les écritures silencieuses.

Conserver les bases : recalculer depuis un total déjà bonifié provoque une accumulation. Un champ nommé `debug_global` peut être une donnée mécanique ; vérifier ses consommateurs avant de le retirer.

Centraliser tables et constantes du jeu. Un dé de base d12, une quantité minimale de 1, dix emplacements de ressource ou une largeur de 820px sont des choix particuliers, pas des obligations de plateforme.

## Sélection indirecte

Pour une arme qui choisit sa caractéristique, lire la valeur technique, vérifier une table de choix autorisés, résoudre la valeur correspondante puis calculer. Écouter à la fois changement du choix et changement de la caractéristique sélectionnée. Éviter d'inventer une interpolation imbriquée de macros.

## Plafonds

```js
const resultat = Math.min(base + bonusOrdinaires, plafond) + modificateurManuel;
```

Cet exemple place le manuel hors plafond. Le déplacer dans `Math.min` change la règle. Conserver les entrées non plafonnées pour un recalcul après suppression d'une source. Documenter la position des exceptions, sans généraliser cet ordre à tous les jeux.

## Parseurs

Un extracteur qui reconnaît certains fragments ne valide pas le texte complet. Par exemple, trouver un entier suivi d'un code dans `3.5FEU` peut accepter le fragment `5FEU` tout en ignorant le préfixe invalide.

Définir grammaire, séparateurs, unités, codes autorisés, erreurs et cas vides. Rejeter le résidu hors grammaire. Pour une formule arithmétique éditable, privilégier un parseur du sous-ensemble annoncé ; ne pas présenter « aucune lettre restante » comme preuve suffisante de sûreté pour `eval`/`Function`.

Ne pas réinterpréter les notes descriptives comme du code. Une regex remplaçant les dés simples ne prend pas en charge toutes les formules Roll20. Les limites acceptées doivent être visibles dans le contrat du champ.

## Contrôles ciblés

- Ajouter puis retirer chaque contribution : retour au résultat initial.
- Sous, au et au-dessus du plafond ; bonus positifs et négatifs.
- Choix de caractéristique modifié puis valeur de cette caractéristique modifiée.
- Texte entièrement valide, partiellement valide, inconnu et vide.
- Total, macro et présentation suivent la même décision mécanique.

Provenance : synthèse des moteurs locaux Solar Rail, Daughters of Lam et Azeroth ; les noms et valeurs propres à ces jeux ne sont pas requis pour employer ces principes.
