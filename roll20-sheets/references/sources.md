# Sources, couverture et maintenance

Lire pour compléter une lacune, résoudre une contradiction ou actualiser une règle. Ne pas ouvrir tout ce catalogue à chaque tâche.

## Niveau de preuve

1. Contrat officiel pertinent pour le moteur et la fonction utilisés.
2. Essai reproductible dans le contexte réellement ciblé, avec date et fichiers.
3. Observation dans du code existant : exemple à examiner, pas certification.
4. Recommandation de conception ou convention personnelle : explicitement identifiée.

Une source officielle peut contenir un passage historique. Exemple : l'introduction interdit IDs et media queries, alors que le document CSE les autorise. Comparer la portée, pas seulement la date affichée sur la page. Si un conflit persiste, décrire la nuance et vérifier un cas minimal.

## Documentation primaire consultée le 2026-11-03

Pages ouvertes pour ce premier essai ; vérification ciblée des points utilisés, pas certification intégrale de toutes leurs API.

| Sujet à rechercher | Source |
| --- | --- |
| CSE/Legacy, classes, IDs, sanitization du chat | [iFrame and Sanitization Changes](https://help.roll20.net/hc/en-us/articles/360061735034-iFrame-and-Sanitization-Changes) |
| Fragment, attributs, repeating, aperçu/Sandbox | [Intro to Sheet Development](https://help.roll20.net/hc/en-us/articles/360037773413-Intro-to-Sheet-Development) — restrictions historiques à recouper |
| getAttrs, setAttrs, on, remove, reporder, traduction, token | [Sheet Worker Scripts](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts) |
| startRoll, finishRoll, computed, boutons de suivi | [Custom Roll Parsing](https://help.roll20.net/hc/en-us/articles/4403865972503-Custom-Roll-Parsing-for-Character-Sheets) |
| Helpers, allprops, conditions, styles de chat | [How to Make Roll Templates](https://help.roll20.net/hc/en-us/articles/360037257334-How-to-Make-Roll-Templates) |
| Dés, relances, explosions, seuils, regroupements | [Dice Reference](https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference) |
| Macros, queries, références, token actions | [Macros & Token Actions](https://help.roll20.net/hc/en-us/articles/360037256794-Macros-Token-Actions) |
| Audience et commandes de chat | [Text Chat](https://help.roll20.net/hc/en-us/articles/360039675093-Text-Chat) |
| data-i18n, JSON, chaînes dynamiques | [Character Sheet Translation](https://help.roll20.net/hc/en-us/articles/360037773493-Character-Sheet-Translation) |
| useroptions et defaults | [Default Sheet Settings](https://help.roll20.net/hc/en-us/articles/360041542554-Default-Sheet-Settings) |
| Drop targets, accept, compatibilité | [Compendium Integration](https://help.roll20.net/hc/en-us/articles/360043790493-Compendium-Integration) |
| Slides, état, événements de l'assistant | [Charactermancer](https://help.roll20.net/hc/en-us/articles/360037257394-Charactermancer) |
| Print CSS et limites de rendu | [Print Friendly](https://help.roll20.net/hc/en-us/articles/10823045719063-Making-Your-Character-Sheet-Print-Friendly) |
| Exigences de soumission | [Minimum Requirements](https://help.roll20.net/hc/en-us/articles/360037773453-Minimum-Requirements-Best-Practices) |
| Structure du dépôt et contribution | [README des fiches HTML/CSS](https://github.com/Roll20/roll20-character-sheets/blob/master/README.md) |
| Politique applicable aux canaux officiels | [AI Policy](https://help.roll20.net/hc/en-us/articles/43164327041943-AI-Policy-for-Community-Mod-Scripts-Character-Sheets) |
| Frontière API, fonctions et versions de sandbox Mod | [Mod Scripts: Function Documentation](https://help.roll20.net/hc/en-us/articles/360037772833-Mod-Scripts-Function-Documentation) |
| Orientation SDK Beacon | [Introduction](https://roll20.github.io/beacon-docs/docs/gettingstarted/introduction/), [installation](https://roll20.github.io/beacon-docs/docs/gettingstarted/installing-beacon/), [dépôt Beacon](https://github.com/Roll20/roll20-beacon-sheets) |

## Ressources complémentaires héritées

Les liens suivants viennent du guide initial et servent de pistes. Leur contenu n'a pas été intégralement revérifié pour cette V1. Ouvrir et examiner le passage pertinent avant d'en tirer une nouvelle obligation.

- [Wiki : restrictions](https://wiki.roll20.net/Character_Sheet_Development/Restrictions), [CSE](https://wiki.roll20.net/Character_Sheet_Enhancement), [sanitization Legacy](https://wiki.roll20.net/Legacy_Sheet_Sanitization).
- [Repeating](https://wiki.roll20.net/Character_Sheet_Development/Repeating_Section), [exemples workers](https://wiki.roll20.net/Sheet_Worker_Snippets), [auto-calc](https://wiki.roll20.net/Building_Character_Sheets/Auto-Calc).
- [CSS Wizardry](https://wiki.roll20.net/CSS_Wizardry), [images](https://wiki.roll20.net/Image_use_in_character_sheets), [bugs et particularités](https://wiki.roll20.net/Character_Sheet_Development/Bugs_%26_Quirks).
- [Finding our flair](https://app.roll20.net/forum/permalink/10754271/) : explications communautaires autour de `$20` et des classes.

Le guide initial avait consulté plusieurs pages Wiki seulement via extraits de recherche en raison d'un blocage d'accès. Ce statut ne doit pas devenir une preuve officielle dans la nouvelle version.

## Étendre sans gonfler l'entrée

Rechercher le nom exact de la fonction et son moteur dans une source primaire. Ouvrir la page, lire le contrat et un exemple, relever date/portée. Ajouter une règle ou un petit exemple dans la référence du sujet. Créer une nouvelle référence seulement pour un besoin distinct, puis la relier depuis `SKILL.md` avec une condition de lecture.

Conserver les cas de régression dans le projet où ils se produisent. Ne pas recopier une documentation externe entière ; résumer les décisions utiles et lier les détails. Une absence dans les résultats de recherche ou dans un dépôt ne démontre pas une interdiction.

## Portée de cette V1

Couverture opérationnelle : fiches HTML/CSS CSE, maintenance Legacy, données, workers, repeating, interface, jets/templates, ressources, migrations, traduction, validation. Intégrations, publication, impression : points d'entrée et contrôles ciblés.

Beacon, Charactermancer avancé et développement complet de scripts Mod sont orientés vers leurs documentations dédiées. Ce paquet n'est pas un miroir exhaustif de toute la plateforme Roll20. Les fonctions internes non documentées ne sont pas proposées comme base stable. Aucun essai VTT n'a été exécuté lors de cette restructuration.
