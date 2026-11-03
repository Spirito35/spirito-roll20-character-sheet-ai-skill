# Interface : navigation, panneaux et jauges

Lire pour un état d'affichage ou une interaction visuelle.

## Persister l'état utile

Page, mode PJ/PNJ, thème et préférences utiles vivent dans des attributs. Les classes ne sont que leur représentation visuelle, à reconstruire à l'ouverture. Décider séparément si un panneau temporaire doit se rouvrir ou se fermer.

`$20` n'est pas jQuery ni un accès DOM général. Les techniques locales examinées emploient `addClass` et `removeClass`. Ne pas en déduire `.css`, `.val`, `.append`, `.html` ou `document.querySelector`. Pour toute méthode supplémentaire, consulter son contrat actuel et faire un essai ciblé. Cette observation locale ne constitue pas une liste exhaustive des fonctionnalités possibles.

## Panneau sans worker

```html
<div class="sheet-details-panel">
  <label><input type="checkbox" class="sheet-toggle"
    name="attr_details_ouverts" value="1">Détails</label>
  <div class="sheet-details">Contenu détaillé.</div>
</div>
```

```css
.charsheet .sheet-details-panel .sheet-details { display: none; }
.charsheet .sheet-details-panel:has(.sheet-toggle:checked) .sheet-details { display: block; }
```

Exemple CSE à valider dans le navigateur cible. Pour un montage sans `:has`, placer le toggle et le panneau comme frères, associer un libellé accessible, puis utiliser `:checked ~ .sheet-details`. Un wrapper intercalé change la relation CSS ; inspecter la structure au lieu de modifier le worker.

## Navigation pilotée par attribut

Conserver une liste fermée de pages, un repli déterministe et des sélecteurs limités au conteneur du composant. Le clic écrit `nav_tab`, le changement et l'ouverture relisent cet attribut et appliquent les classes. Éviter une classe globale qui masque simultanément PJ, PNJ et familier.

Les classes manipulées localement doivent être reconstruites chez les autres lecteurs à partir des données. Ne pas utiliser leur présence comme vérité mécanique ou permission.

## Jauge

Décider du maximum nul, des valeurs négatives, du dépassement et du sens des couleurs. Une charge élevée et une réserve élevée n'ont pas la même signification.

Patron observé : pourcentage visuel borné 0–100, classe `sheet-barN`, largeurs précompilées dans le CSS. Le worker retire les anciennes classes puis ajoute celle du niveau actuel. Les valeurs métier restent indépendantes du pourcentage. Éviter un appel inventé à `$20(...).css("width", ...)`.

Pour mettre une valeur sur la barre, superposer le texte à un parent positionné, sans l'inclure dans le flux du remplissage. Vérifier que les couches décoratives ne capturent pas le clic.

## Panneaux superposés et pistes

Définir fermeture, exclusivité, hauteur maximale et défilement. Tester une ancienne fiche dont plusieurs états « ouvert » sont sauvegardés. Une superposition visuelle n'est pas un véritable dialogue accessible par simple ajout d'un rôle ARIA.

Pistes cumulatives : cocher un cran reconstruit les crans inférieurs en une opération idempotente. États cycliques : garder une valeur métier stable, dériver l'affichage. Ne pas recalculer un coût pour chaque case changée si l'action représente une seule dépense.

## Contrôles ciblés

- Fermer/rouvrir et changer de personnage : état attendu restauré.
- Changer valeur et maximum : jauge cohérente, maximum zéro traité.
- Deux lecteurs, deux panneaux, fenêtre détachée : pas d'état parasite.
- Clavier, focus, fermeture et clics à travers les overlays utilisables.

Provenance : techniques des fiches locales Solar Rail, Daughters of Lam et Azeroth ; recommandations de conception. Compatibilité CSE à recouper via [sources.md](sources.md), et non par généralisation depuis ces seules fiches.
