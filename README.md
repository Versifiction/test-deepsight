# recipe-interview

## Consignes

Vous allez coder une application React qui suggère des recettes de cuisine.

Quand l'utilisateur arrive sur l'application pour la première fois, on lui propose 3 ingrédients qu'il peut cocher (`tomato`, `onions`, `garlic`). On lui propose également une barre de recherche dans laquelle il peut entrer un nom de plat. Une fois les cases cochées et la barre de recherche complétée, il peut lancer sa recherche en cliquant sur le bouton `SEARCH`.

Il apparait un tableau avec 10 recettes max.

Le tableau comprend 3 colonnes: `Title`, `Picture`, `Ingredients`.

En dessous de ce tableau, on affichera les 5 ingrédients qui apparaissent le plus dans les résultats et le nombre d'apparition.

Lorsque l'utilisateur clique sur une ligne, un nouvel onglet s'ouvre avec la page de la recette (celle qui apparait dans `href`).

On utilisera l'api http://www.recipepuppy.com/api

Pour éviter les problèmes CORS, on passera par le serveur local qui tourne sur `localhost:8888`

Exemple d'utilisation. Pour rechercher une recette qui comprend les ingrédients :

- `onions`
- `garlic`

et qui correspond à une recette `omelet`, la requete est :

http://localhost:8888/api?i=onions,garlic&q=omelet&p=1

## Installation

```bash
$ git clone https://github.com/deepsight-group/recipe-interview.git ~/recipe-interview
$ (cd ~/recipe-interview/recipe-app && npm install)
$ (cd ~/recipe-interview/recipe-server && npm install)
```

## Run

Lancer deux sessions Bash, puis :

Pour l'app :

```bash
$ (cd ~/recipe-interview/recipe-app && npm start)
```

Pour l'api :

```bash
$ (cd ~/recipe-interview/recipe-server && npm start)
```

## Requirements

- `npm` version >= 6.14.6
- `node` version >= 12.18.3

## Rendu

A la fin des 1h30 :

- Supprimer les `node_modules` :

```bash
$ (rm -rf ~/recipe-interview/recipe-app/node_modules)
$ (rm -rf ~/recipe-interview/recipe-server/node_modules)
```

- Zipper le dossier `recipe-interview`
- L'envoyer via Zoom
