# RockPaperScissor

## Description
Un petit jeu visuel animé en JavaScript utilisant un canvas HTML5. Des éléments "pierre", "feuille" et "ciseaux" se déplacent et s’affrontent selon les règles classiques du jeu pierre-feuille-ciseaux. Lorsqu’un élément rencontre un autre qu’il peut battre, il le transforme à son type. Le but est de voir un type dominer tous les autres.

## Fonctionnalités
Animation fluide des éléments sur tout l’écran.
Gestion des collisions avec rebond et transformation selon les règles pierre-feuille-ciseaux.
Affichage d’un popup quand un type a complètement gagné.
Adaptation automatique à la taille de la fenêtre.
Chargement asynchrone des images.

## Installation
Cloner ou télécharger ce dépôt.
Placer les images (granite.png, leaf.png, scissor.png, humanStone.png, humanLeaf.avif, humanScissor.png) dans un dossier images/ à la racine.
Ouvrir le fichier index.html dans un navigateur moderne.

## Utilisation
Le jeu démarre automatiquement après le chargement complet des images.
Quand un type gagne, un popup s’affiche avec une image correspondante.
Cliquer sur un bouton de redémarrage recharge la page pour recommencer.

## Structure du code
index.html : Contient le canvas, le popup et le script JS.
script.js : Animation, gestion des collisions et règles du jeu.
images/ : Contient toutes les images nécessaires.

## Technologies
HTML5 Canvas
JavaScript (Vanilla)
