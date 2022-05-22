<h1>Projet Lockdoor</h1>
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table des matières</h2></summary>
  <ol>
    <li><a href="#Présentation">Présentation</a></li>
    <li><a href="#Fonctionnalités">Fonctionnalités</a></li>
    <li><a href="#Installation et lancement du projet">Installation et lancement du projet</a></li>
    <li><a href="#Installation de l'application mobile">Installation de l'application mobile</a></li>
    <li><a href="#Architecture">Architecture</a></li>
    <li><a href="#Contact">Contact</a></li>
  </ol>
</details>

## Présentation

Sur un module d'une vingtaine d'heure, nous avons réalisé un projet en lien avec la spécialité Internet of Things. L'objectif du projet est, à partir d'une page Internet ou de boutons poussoirs, de piloter la maquette KNX qui commande 4 LED. 

Plusieurs étapes permettent de mener à bien le projet :
1. Réalisation de l’architecture
2. Choix des langages de programmation
3. Création d'un serveur
4. Création d'une page web pour commander la maquette KNX
5. Communication client - serveur
6. Communication serveur - maquette KNX


## Fonctionnalités

Afin d'assurer un maximum d'intéraction entre l'utilisateur et l'interface web, nous avons développé des fonctionnalités :
1. Connexion - Déconnexion à la maquette
2. Allumer - Éteindre les LED
3. Changer le mode de fonctionnement (chenillard de gauche vers la droite et inversement, mode flipper et random)
4. Augmenter - Diminuer la vitesse

## Installation et lancement du projet

1. Cloner le répertoire
   ```sh
   git clone https://github.com/ESIR2-Lockdoor/LockdoorProject.git
   ```
2. Se positionner dans le répertoire LockdoorProject/Porte/Websocket
3. Installer les librairies suivantes à votre répertoire :
   ```sh
   npm install express
   npm install -D nodemon
   npm install onoff
   npm install socket.io

   ```
4. Ouvrir l'interface web depuis votre navigateur avec l'url http://localhost:8080

## Installation de l'application mobile
Installer l'APK qui se trouve dans le dossier mobile_app

## Architecture

Nous pouvons voir ci-dessous l'architecture général du projet :
 ![Screenshot](architecture/architecture_generale.png) 
 ![Screenshot](architecture/architecture.png)

## Contact

[@Mathis Certenais](https://www.linkedin.com/in/mathiscertenais/)
[@Mateo Fontanel](https://www.linkedin.com/in/mat%C3%A9o-fontanel-2913b914a/?originalSubdomain=fr)
