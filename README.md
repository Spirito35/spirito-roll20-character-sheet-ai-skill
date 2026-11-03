# Roll20 Sheets — premier paquet partageable

Version de travail : 2026-11-03. Langue des instructions : français. Un même dossier de skill est utilisable par Codex et Claude Code ; il contient des instructions Markdown et un outil Python facultatif sans dépendance externe.

## Ce qu'il contient

- [SKILL.md](roll20-sheets/SKILL.md) : entrée courte, choix des références et invariants.
- Dix-huit références par sujet, reliées depuis l'entrée. Chaque sujet indique quand le lire et quels contrôles sélectionner.
- [check_sheet.py](roll20-sheets/scripts/check_sheet.py) : vérificateur statique en lecture seule, Python 3.10+.
- [Catalogue de sources](roll20-sheets/references/sources.md) : liens officiels, date de consultation et limites de couverture.

Le paquet fonctionne sans les fiches, sauvegardes ou chemins de Spirito. Les exemples sont courts et adaptables ; les conventions et observations personnelles restent hors de ce dossier public. Il n'est pas affilié à Roll20 et ne reproduit pas un manuel officiel complet.

## Installer dans un projet

Copier le dossier **entier** `roll20-sheets`, pas seulement `SKILL.md`, à l'emplacement voulu :

| Outil | Destination dans le projet |
| --- | --- |
| Codex | `.agents/skills/roll20-sheets/` |
| Claude Code | `.claude/skills/roll20-sheets/` |

Les deux copies doivent venir de la même version du paquet pour éviter des instructions divergentes. Garder ce dossier comme source éditable et recopier le dossier complet lors d'une mise à jour. Ne pas installer plusieurs copies du même skill dans le même outil sans raison.

Sources d'installation consultées le 2026-11-03 : [Codex](https://learn.chatgpt.com/docs/build-skills), [Claude Code](https://code.claude.com/docs/en/skills). Les emplacements ci-dessus visent les sessions locales sur projet ; Claude.ai, Cowork et les environnements cloud ont leurs propres modalités de chargement à vérifier dans leur documentation.

Depuis GitHub, télécharger le dépôt avec **Code → Download ZIP**, puis extraire et copier le sous-dossier `roll20-sheets` à la destination appropriée. Conserver également le fichier `LICENSE` avec les copies distribuées. L'archive de travail locale `roll20-sheets-v1.zip` n'est pas nécessaire pour utiliser ce dépôt. Aucune installation globale ni configuration de projet n'a été effectuée par la préparation de cette V1.

## Essayer

Dans Codex :

```text
Utilise $roll20-sheets pour corriger le total de poids après suppression
de la dernière ligne d'inventaire dans les fichiers indiqués.
```

Dans Claude Code :

```text
/roll20-sheets Corrige le total de poids après suppression de la dernière
ligne d'inventaire dans les fichiers indiqués.
```

Le nom et la description permettent aussi la sélection automatique selon l'environnement. Si le skill n'apparaît pas, vérifier la destination et le rechargement des skills dans la version de l'outil utilisée.

Pour appliquer une convention propre au projet, la fournir dans ses instructions habituelles. Exemple : « Pour ce projet, ne pas ajouter de commentaires ou caractères non-ASCII au CSS livré ; préserver les exceptions explicitement documentées. » Cette préférence n'est pas imposée au public.

## Étendue et limites

La V1 couvre surtout la création et maintenance HTML/CSS CSE et les particularités Legacy. Elle couvre les décisions usuelles autour des données, workers, repeating, CSS, jets, templates, ressources, import/export, traduction et validation. Beacon, Charactermancer et Mod/API disposent d'une orientation et de sources dédiées ; ils ne sont pas assimilés à l'architecture CSE.

Les règles ont été restructurées depuis les deux guides de Spirito et recoupées sur des points ciblés avec les sources listées. Aucun accès en partie Roll20 n'a servi à valider cette V1. Le script ne certifie pas un worker, un rendu ou une règle de jeu.

## Maintenir l'efficacité

Ne pas demander au modèle de lire tous les Markdown au démarrage. Le laisser choisir les références selon le changement. Garder une règle à un seul endroit, les historiques d'incidents dans le projet et les longues documentations derrière des liens ciblés.

Après un échec réel, ajouter le scénario à la recette de régression puis corriger l'instruction responsable. Mesurer le contenu effectivement lu et le résultat obtenu sur des tâches comparables. La longueur des fichiers n'est qu'un indicateur ; elle ne mesure pas seule les tokens consommés ni la qualité.

Le [protocole d'évaluation](EVALUATION.md) fournit cinq demandes représentatives et leurs critères de réussite pour comparer les deux agents.

Pour modifier les références, conserver les sources et qualifications de preuve. Ne pas remplacer une recommandation par « obligatoire » sans justification de plateforme ou de projet.
