#  Mon Atelier de Dessin

##  Description
Une application web interactive de dessin qui permet aux utilisateurs de créer des œuvres d'art directement dans le navigateur. L'outil propose un pinceau, une gomme, plusieurs couleurs, des tailles variables et la possibilité de sauvegarder le dessin.

##  Technologies utilisées
- **HTML5** : Structure de la page et canvas
- **CSS3** : Design, animations, responsive
- **JavaScript (Vanilla)** : Logique de dessin, interactions, événements

##  Fonctionnalités principales
-  Dessin à main levée avec la souris ou le tactile
-  Choix de couleurs (palette + sélecteur personnalisé)
-  Ajustement de la taille du pinceau (1px à 50px)
-  Mode gomme pour effacer
   Bouton "Tout effacer" avec confirmation
-  Sauvegarde du dessin en image PNG
-  Raccourcis clavier (B, E, C, S, +, -)
-  Animations CSS fluides
-  Interface responsive (mobile/tablette/desktop)

##  Lien GitHub Pages
[Cliquez ici pour tester l'application](https://eya469.github.io/Eya_fatnassi_atelier_dessin/)

## Nouveautés explorées
- Manipulation avancée du **Canvas API** (paths, strokes, gestion des coordonnées)
- Gestion des événements **tactiles** pour mobile
- Implémentation de **raccourcis clavier** personnalisés
- **Animations CSS** (keyframes, transitions, transformations)
- Sauvegarde d'image via `canvas.toDataURL()`

##  Difficultés rencontrées
1. **Problème** : Incohérence entre les coordonnées souris et le canvas sur mobile.
   - **Solution** : Calcul du ratio `scaleX/scaleY` avec `getBoundingClientRect()`.

2. **Problème** : Traces discontinues lors du dessin rapide.
   - **Solution** : Utilisation de `beginPath()` et `moveTo()` à chaque mouvement.

3. **Problème** : La gomme ne fonctionnait pas correctement.
   - **Solution** : Changer `strokeStyle` en blanc et garder le fond blanc.

##  Auteur
- **Nom et Prénom** : [fatnassi eya]
- **Email** : [fatnassie925@gmail.com]
- **GitHub** : [eya469]

## 📅 Date de rendu
Avril 2026
