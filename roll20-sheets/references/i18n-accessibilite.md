# Traduction, accessibilité et impression

Lire pour texte traduit, interface partagée ou sortie imprimée.

## Traduction

```html
<label>
  <span data-i18n="weapon-name">Nom de l'arme</span>
  <input type="text" name="attr_arme_nom"
    placeholder="Nom" data-i18n-placeholder="weapon-name">
</label>
```

```json
{ "weapon-name": "Nom de l'arme" }
```

Traduire les libellés et descriptions, conserver les noms d'attributs et valeurs techniques. Charger réellement `translation.json` dans l'éditeur ou le Sandbox ; sa seule présence sur disque ne garantit pas son utilisation.

`getTranslationByKey` sert aux textes construits en worker ; prévoir un repli si la clé manque. `^{cle}` sert dans les macros de fiche. `data-i18n-dynamic` vise les cas où une valeur affichée est une clé de traduction ; vérifier son emploi exact avant de le substituer à un texte libre.

Inventorier aussi les clés générées en JS, pas seulement les attributs HTML. Ne pas sauvegarder une traduction du premier lecteur comme unique vérité du personnage partagé. Tester changement de langue et plusieurs lecteurs si la fiche génère des macros localisées persistantes.

Source vérifiée le 2026-11-03 : [Character Sheet Translation](https://help.roll20.net/hc/en-us/articles/360037773493-Character-Sheet-Translation).

## Accessibilité

Libellé par contrôle, nom accessible pour icône seule, focus visible et parcours clavier utilisable. Un placeholder ou un tooltip seul ne remplace pas un libellé. Les informations essentielles doivent rester accessibles sans survol.

Ne pas utiliser seulement la couleur pour réussite, échec ou activation. Tester contraste, zoom, textes longs et taille de police. Donner aux éléments le rôle correspondant à leur comportement : une image cliquable n'est pas un titre par simple ajout de `role="heading"`.

Les contrôles masqués et panneaux superposés ne doivent pas retenir le focus dans une zone invisible. Employer les éléments natifs lorsque possibles ; tester plutôt que compter les attributs ARIA.

## Impression

Activer uniquement si elle fait partie des besoins. En CSE, utiliser des règles `@media print`, avec page claire, commandes inutiles cachées, sections utiles visibles et coupures adaptées. Inventorier onglets, listes filtrées et notes hors écran à inclure.

Tester une fiche courte et une longue, depuis le contexte d'impression réel, puis vérifier le PDF. Le support d'une règle CSS ne garantit pas que toutes les données voulues sont rendues. Le contournement des styles de fenêtre doit rester limité au contexte imprimé.

Source vérifiée le 2026-11-03 : [Print Friendly](https://help.roll20.net/hc/en-us/articles/10823045719063-Making-Your-Character-Sheet-Print-Friendly).

## Contrôles ciblés

- Clés statiques et dynamiques résolues ; au moins deux langues si multilingue.
- Pas de renommage des valeurs techniques pour traduire.
- Saisie, boutons, navigation et fermeture utilisables au clavier.
- Grand texte/zoom sans perte d'action ou de valeur.
- Impression : sections attendues, listes longues et lisibilité du résultat.
