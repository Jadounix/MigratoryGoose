# MigratoryGoose
Petit projet (réalisé dans un cadre scolaire) d'un système multi agents ayant pour thème la migration des oiseaux.
![simulation_picture](code/images/simgif.gif)

## Installation
Une fois le code source copié sur sa propre machine, il est nécessaire de lancer la commande `npm install` afin de télécharger les librairies dont dépend le projet.
Pour lancer la simulation, il suffit ensuite simplement d’ouvrir le fichier index.html contenu dans le dossier code. Les instructions d’utilisation de la simulation sont également décrites dans la page web.

## Utilisation de la simulation
Le nombre d’arbres influence le déplacement des oiseaux. Il est plus difficile pour eux de voler à travers les cimes et ils auront tendance à préférer les zones dégagées. 
Le nombre d’arbres doit être compris entre 0 et 1000.

Le nombre initial d'individus dans chaque population de la simulation doit être compris entre 1 et 100.

Les taux de nourriture, de catastrophes naturelles et de reproduction doivent êtres compris entre 0 et 1. Attention, la somme des taux de nourriture et de catastrophes naturelles ne peut pas dépasser 1.

Une fois les paramètres choisis, vous pouvez cliquer sur Confirmer les paramètres, puis sur le bouton Lancer les paramètres. Vous pouvez également utiliser le bouton Réinitialiser les paramètres pour les faire revenir à leurs valeurs par défaut.

Les boutons Scénario 1, 2 et 3 correspondent à des jeux de paramètres précis, utilisés pour comparer différents environnements de simulation. Les résultats de ces tests sont disponibles dans la partie Scénario de tests du rapport associé au projet.

Une fois la simulation lancée, les paramètres ne peuvent plus être modifiés. Les boutons Lancer la simulation et Arrêter la simulation permettent de faire des pauses à n’importe quel moment et de reprendre ensuite la simulation là où elle s’est arrêtée.

## Documentation
Une documentation plus complètes sur la création de Migratory Goose disponibles dans ce [document](rapport.pdf).
Une vidéo explicative du projet se trouve dans le [dossier Drive](https://drive.google.com/drive/folders/1-Zapn_Mmr8edoH0dLd-4J3Fxs-gdHIn8?usp=sharing) suivant.




