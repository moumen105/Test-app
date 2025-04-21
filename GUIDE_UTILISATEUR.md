# Guide Utilisateur - Calculateur de Durée Musicale

## Introduction

Le Calculateur de Durée Musicale est une application qui vous permet de calculer précisément la durée d'un morceau de musique en fonction de son nombre de mesures, son chiffrage et son tempo. Le résultat est affiché en unités de temps variées, allant des millisecondes aux millénaires.

## Installation

### Version Web

Aucune installation n'est nécessaire. Visitez simplement l'URL de l'application : [https://musical-duration-frontend.onrender.com](https://musical-duration-frontend.onrender.com)

### Version macOS (application .dmg)

1. Téléchargez le fichier .dmg depuis la page des [releases GitHub](https://github.com/votre-compte/calculateur-duree-musicale/releases)
2. Double-cliquez sur le fichier .dmg téléchargé
3. Faites glisser l'application dans votre dossier Applications
4. Vous pouvez maintenant lancer l'application depuis votre Launchpad

## Utilisation de l'application

### Interface principale

L'interface de l'application comprend un formulaire avec les champs suivants:

1. **Nombre de mesures** : Indiquez le nombre total de mesures dans votre morceau
2. **Tempo (BPM)** : Entrez le tempo en battements par minute
3. **Numérateur** : Le chiffre supérieur du chiffrage (par exemple, le 3 dans 3/4)
4. **Dénominateur** : Le chiffre inférieur du chiffrage (par exemple, le 4 dans 3/4)
5. **Note du mouvement** : Sélectionnez la note qui reçoit un battement selon le tempo

Le symbole de la note sélectionnée est affiché en grand sous le formulaire.

### Calcul de la durée

1. Remplissez tous les champs du formulaire
2. Cliquez sur le bouton "Calculer la durée"
3. Le résultat s'affiche sous forme de carte avec la durée détaillée

### Comprendre les résultats

Le résultat du calcul est affiché en plusieurs unités de temps:

- Millénaires
- Siècles
- Années
- Mois
- Jours
- Heures
- Minutes
- Secondes
- Millisecondes

## Exemples pratiques

### Exemple 1: Un morceau à tempo modéré

- Nombre de mesures: 120
- Numérateur: 4
- Dénominateur: 4
- Note du mouvement: Noire (♩)
- Tempo: 100 BPM

Résultat attendu: environ 4 minutes et 48 secondes.

### Exemple 2: Une symphonie complète

- Nombre de mesures: 2000
- Numérateur: 3
- Dénominateur: 4
- Note du mouvement: Noire (♩)
- Tempo: 80 BPM

Résultat attendu: environ 1 heure et 15 minutes.

## Fonctionnalités avancées

### Notes pointées et doublement pointées

L'application prend en charge les notes pointées et doublement pointées. Une note pointée augmente sa durée de moitié, tandis qu'une note doublement pointée augmente sa durée de trois-quarts.

### Symboles de notes

Chaque type de note est représenté par son symbole musical traditionnel:
- Ronde: o
- Blanche: b
- Noire: ♩
- Croche: ♪
- Double croche: ♫
- Triple croche: ♬
- Etc.

## Dépannage

### L'application ne se lance pas

- Vérifiez que vous avez une connexion Internet active (pour la version web)
- Pour la version macOS, assurez-vous que votre système est à jour (macOS 10.13 ou supérieur)
- Si l'application affiche un avertissement de sécurité, allez dans Préférences Système > Sécurité et confidentialité et autorisez l'application

### Erreurs de calcul

- Vérifiez que vous avez entré des nombres valides dans tous les champs
- Assurez-vous que les valeurs de dénominateur sont cohérentes avec la théorie musicale (généralement 2, 4, 8, 16, etc.)

## Contact et support

Pour toute question ou problème, veuillez nous contacter à l'adresse: support@dureemusic.com

## Licence

Cette application est distribuée sous licence MIT. Vous êtes libre de l'utiliser, la modifier et la redistribuer selon les termes de cette licence. 