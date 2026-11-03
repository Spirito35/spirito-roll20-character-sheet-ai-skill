# Diagnostic par symptôme

Lire quand la couche en cause n'est pas encore identifiée. Choisir une ligne puis ouvrir sa référence, sans auditer toute la fiche.

Commencer par les fichiers effectivement chargés, leur mode, le scénario attendu et l'erreur console initiale. Comparer un personnage neuf et celui qui échoue. Réduire à un champ, une ligne ou un bouton ; relever valeurs avant/après et commande produite.

| Symptôme | Premier contrôle | Référence |
| --- | --- | --- |
| Aucun style / fiche vide | Paire chargée, structure, mode et console | [environnement](environnement.md), [HTML](html.md) |
| Tous les calculs arrêtés | Première erreur JS, blocs et noms dupliqués | [workers](workers.md) |
| Saisie perdue à la fermeture | `name="attr_..."`, valeur réellement enregistrée | [données](donnees.md) |
| Deux saisies liées involontairement | Attribut homonyme | [données](donnees.md) |
| Ancien personnage seul affecté | Valeur sauvegardée, init/migration | [migrations](migrations-import.md) |
| Zéro remplacé / `NaN` / concaténation | Conversions, fallback truthy | [données](donnees.md) |
| Calcul correct seulement après réouverture | Événement manquant ou chaîne coupée par silent | [workers](workers.md) |
| Total périmé après suppression | Listener remove, branche collection vide | [repeating](repeating.md) |
| Mauvaise ligne après déplacement | RowID, position prise pour identité | [repeating](repeating.md) |
| Liste chat mal ordonnée | Ordre manuel ignoré | [repeating](repeating.md) |
| Bonus affiché mais jet ancien | Macro dérivée non régénérée | [jets](jets-macros.md) |
| Bouton muet | Overlay, type, nom, listener, console | [interface](interface.md), [HTML](html.md) |
| Dés inattendus / erreur de jet | Commande exacte, fragments vides/masqués | [jets](jets-macros.md) |
| Critique incohérent en avantage | Résultat retenu différent selon branches | [templates](roll-templates.md) |
| Résultat CRP manquant | finishRoll, nom de propriété, computed | [jets](jets-macros.md) |
| Mode privé public | Préfixe effectivement envoyé, autre lecteur | [jets](jets-macros.md) |
| Coût incohérent en double clic | Lectures concurrentes, moment du prélèvement | [ressources](ressources.md) |
| Repos ou ouverture efface une saisie | Recalcul écrasant le manuel | [ressources](ressources.md), [migrations](migrations-import.md) |
| Onglet cassé après ajout d'un wrapper | Parenté/adjacence CSS, attribut de navigation | [interface](interface.md) |
| Jauge incorrecte | Classe existante, valeur/max, dimensions | [interface](interface.md) |
| Débordement / popout cassé | Minimum intrinsèque, ancêtres des sélecteurs | [CSS](css-assets.md) |
| Icône affichée en toutes lettres | Chargement de fonte et ligatures | [CSS](css-assets.md) |
| Thème du chat différent | Variables et classes du contexte chat | [templates](roll-templates.md) |
| Clé de traduction affichée | JSON chargé, clé exacte, clé dynamique | [i18n](i18n-accessibilite.md) |
| Accents illisibles dans le terminal | Décoder UTF-8 avant de conclure à une corruption | [validation](validation.md) |

Ne pas attribuer automatiquement un CSS rejeté aux commentaires ou à Unicode. Vérifier syntaxe, mode et différence avec la version fonctionnelle. Ne pas transformer une hypothèse de cette table en diagnostic certain sans reproduction ou preuve de code.
