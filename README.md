# Durée Musicale Web App

Une application web permettant de calculer la durée réelle d'un morceau de musique en fonction du tempo et des notations musicales.

## Fonctionnalités

- Calcul de la durée d'un morceau basé sur le nombre de mesures, la signature rythmique et le tempo
- Affichage des symboles musicaux correspondant aux notes sélectionnées
- Conversion des durées en diverses unités de temps (millénaires, siècles, années, mois, jours, heures, minutes, secondes)
- Interface utilisateur intuitive et responsive

## Technologies utilisées

- React (avec Hooks)
- Styled Components pour le style
- JavaScript ES6+

## Installation en local

1. Clonez ce dépôt
```bash
git clone https://github.com/votre-username/duree-musicale-app.git
cd duree-musicale-app
```

2. Installez les dépendances
```bash
npm install
```

3. Démarrez l'application en mode développement
```bash
npm start
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application dans votre navigateur

## Déploiement sur GitHub Pages

1. Modifiez le fichier `package.json` pour ajouter votre nom d'utilisateur GitHub:
```json
"homepage": "https://votre-username.github.io/duree-musicale-app",
```

2. Installez gh-pages
```bash
npm install --save-dev gh-pages
```

3. Ajoutez ces scripts à votre package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  // ... autres scripts existants
}
```

4. Déployez sur GitHub Pages:
```bash
npm run deploy
```

## Déploiement sur Render

1. Créez un compte sur [Render](https://render.com) si vous n'en avez pas déjà un

2. Connectez votre compte GitHub à Render

3. Dans le dashboard Render, cliquez sur "New" puis "Static Site"

4. Sélectionnez le dépôt GitHub qui contient votre application

5. Configurez les options de déploiement:
   - Build Command: `npm run build`
   - Publish Directory: `build`

6. Cliquez sur "Create Static Site"

Render déploiera automatiquement votre application et vous fournira une URL pour y accéder. Il redéploiera également votre application à chaque push sur la branche principale.

## Personnalisation

Vous pouvez facilement personnaliser l'apparence de l'application en modifiant les composants styled-components dans `App.js`.

## Licence

MIT 