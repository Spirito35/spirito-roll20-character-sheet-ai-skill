# Jets, macros et Custom Roll Parsing

Lire pour bouton de jet, commande générée, query, audience ou coût lié à un jet.

## Séparer les langages

| Syntaxe | Interprétation |
| --- | --- |
| `@{force}` | Attribut du contexte de macro |
| `@{selected\|force}` / `@{target\|force}` | Attribut via token sélectionné / cible |
| `%{Personnage\|attaque}` | Bouton/ability nommé |
| `?{Bonus\|0}` | Question au lancement |
| `[[1d20+3]]` | Expression du moteur de dés |
| `&{template:demo}` | Choix du template |
| `{{resultat=...}}` | Propriété de template |
| `^{cle}` | Traduction de macro de fiche |
| `${variable}` | Interpolation de chaîne JS en backticks uniquement |

Un worker peut construire une formule sans l'évaluer. Si la commande est sauvegardée dans un attribut dérivé, régénérer sur toutes ses dépendances. Un affichage de total à jour ne prouve pas que le bouton utilise la même valeur.

## Choisir le bouton

`type="roll"`, `name="roll_test"` : commande native, jet ou texte de chat. `type="action"`, `name="act_test"` : handler `clicked:test`, adapté à la validation d'un coût et à CRP. Un bouton action n'est pas nécessaire pour publier une simple description.

Un appel `!commande` suppose un script Mod/API installé dans la campagne. Il ne crée pas une API native de worker.

## Dés

| Motif | Usage |
| --- | --- |
| `2d20kh1` / `2d20kl1` | Garder le plus haut / bas |
| `{expression1,expression2}kh1` | Comparer des expressions groupées compatibles |
| `Nd10!` | Explosion |
| `Nd10s` | Tri |
| `Nd10>5` | Comptage au seuil inclusif |
| `1d20cs>19cf1` | Marqueurs de critique/échec |
| `NdF` | Dés Fudge |
| `[[0]]` | Valeur numérique sans lancer un dé |

Ne pas confondre marqueur de critique et effet mécanique automatique. Pour relances, succès/échecs, regroupements, arrondis ou ordre des modificateurs, ouvrir la [Dice Reference](https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference), vérifiée le 2026-11-03. L'absence d'une syntaxe dans un corpus local ne réfute pas sa documentation.

Un maximum calculé en remplaçant `NdS` par `N*S` ne couvre pas `kh`, explosions et relances. Définir le sous-ensemble accepté ou un calcul de maximum séparé.

## Dés facultatifs

Masquer une propriété au rendu n'empêche pas le jet déjà présent dans la commande. Omettre les fragments désactivés ; éviter `[[ ]]`. Traiter un pool nul explicitement. Si plusieurs affichages représentent un même tirage, réutiliser ce résultat plutôt que relancer.

## Cycle CRP

```js
on("clicked:mesurer", () => {
  startRoll("&{template:mesure} {{jet=[[1d20]]}}", result => {
    const total = result.results.jet.result;
    finishRoll(result.rollId, { jet: total - 10 });
  });
});
```

Le template `mesure` doit afficher `{{jet}}` pour l'original et `{{computed::jet}}` pour le résultat calculé. `finishRoll` reçoit l'identifiant rendu par `startRoll`. Garder le traitement court et finaliser tous les chemins ; la documentation décrit une publication automatique après environ cinq secondes sans finalisation.

L'exemple utilise le callback documenté. Si le projet emploie déjà une forme Promise, vérifier le contrat de sa version ou de son wrapper ; ne pas ajouter `await` à un appel avec callback en supposant qu'il attend ce callback.

Source vérifiée le 2026-11-03 : [Custom Roll Parsing](https://help.roll20.net/hc/en-us/articles/4403865972503-Custom-Roll-Parsing-for-Character-Sheets).

## Audience, initiative et suivi

Centraliser le préfixe d'audience. `/me` est une emote publique. `/w gm` et `/gmroll` répondent à des usages différents de commande ; vérifier le texte effectivement produit et le destinataire avec un autre compte. Ne pas remplacer un mode secret/privé par un autre sans lire son contrat actuel.

`&{tracker}` dépend du contexte de token ; tester sélection, liaison et entrée déjà présente. Manipuler arbitrairement l'ordre de campagne relève d'une intégration distincte.

Un lien d'action de chat créé via CRP doit résoudre la référence complète de ligne. Tester ligne supprimée, clic répété, personnage homonyme et clic d'un autre joueur. `originalRollId` identifie le jet d'origine, pas la ligne. Un clic ultérieur peut lire les valeurs actuelles plutôt que celles au moment de l'attaque.

Sources vérifiées le 2026-11-03 : [Text Chat](https://help.roll20.net/hc/en-us/articles/360039675093-Text-Chat), [Macros & Token Actions](https://help.roll20.net/hc/en-us/articles/360037256794-Macros-Token-Actions).

## Échappement

Identifier chaque couche : HTML, chaîne JS, macro, query, propriété de template, lien. Il n'existe pas de nettoyage universel. Tester apostrophe, accent, barre verticale, accolades et retour à la ligne. Encoder seulement le niveau nécessaire d'une query imbriquée ; remplacer tous les séparateurs casse les références d'attributs. Réduire d'abord à une query simple, puis ajouter les niveaux.

## Contrôles ciblés

- Commande réelle à jour ; vide, zéro et formule invalide gérés.
- CRP finalisé ; résultat calculé relié au bon nom de propriété.
- Aucun dé facultatif lancé involontairement.
- Audience vérifiée, coût et double clic testés si concernés.
- Lien repeating complet et initiative sur le bon token.
