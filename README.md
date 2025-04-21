# Calculateur de Durée Musicale

Une application web permettant de calculer la durée précise d'un morceau de musique en fonction du nombre de mesures, du chiffrage et du tempo.

## Fonctionnalités

- Calcul de la durée totale d'un morceau de musique
- Conversion en unités de temps (millénaires, siècles, années, mois, jours, heures, minutes, secondes)
- Affichage des symboles de notes musicales

## Installation

### Prérequis
- Python 3.8+
- Node.js 16+
- npm ou yarn

### Installation du back-end

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Installation du front-end

```bash
cd frontend
npm install
npm start
```

## Création du package .dmg pour macOS

Pour créer une application macOS (.dmg):

```bash
cd frontend
npm run build
npm run package-mac
```

## Déploiement

L'application peut être déployée sur n'importe quel service hébergement web comme Render ou Vercel.

## Licence

MIT 