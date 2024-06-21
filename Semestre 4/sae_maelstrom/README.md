# SAE_Maelström

## Nom de l'équipe : 
Maelström

## Les membres de l'équipe: 
- Quentin MERI

- Kenza HATEM

- Arda TEMIZ

- Amokrane AIT TAOUIT

- Mohamed LAZAR

## Description du projet

Ce projet du groupe **Di Evoluzion** a été développé dans le cadre d'une SAÉ (Situation d'Apprentissage et d'Évaluation) pour la formation de BUT Informatique en 2ème année au 3ème semestre. Il s'agit d'un outil de pilotage des heures d'enseignants à l'IUT de Villetaneuse, plus précisément d'un site intranet.

## Comment déployer le projet ?

1. Clonez notre dépôt
```
git clone https://gitlab.sorbonne-paris-nord.fr/maelstrom/sae_maelstrom.git

```
Ou accéder directement via l'url 
[serveur jupyter](https://jupyter.univ-paris13.fr/~12201395/)

2. Modifiez les informations suivantes :

> - Identifiant, Mot de passe, et autres dans `Models/credentials.php`
> - Identifiant, Mot de passe, et autres dans `Utils/EmailSender.php` (Ne pas changer pour tester la fonctionnalité de mot de passe oublié directement)

3. Exécutez comme suit les trois scripts SQL suivants pour remplir la base de données :
    - `SAE.sql`
    - `Fonctions.sql`
    - `Trigger.sql`

    Vous pouvez exécuter ces scripts à l'aide d'un outil de gestion de base de données (pgAdmin ou pgSQL directement).

## Structure

- Le répertoire `Content`: où se trouvent la feuille de style CSS, les polices d'écritures en format `.ttf`, et les images utilisées.
- Le répertoire `Controllers`: contient les contrôleurs qui gèrent les interactions entre les modèles et les vues.
- Le répertoire `Models `: contient les modèles de l'application, responsables de la logique métier et de l'interaction avec la base de données. À l'intérieur, vous retrouverez :
- Le fichier `model.php` : représente le modèle de base à partir duquel les autres modèles héritent. Il peut contenir des fonctionnalités communes à tous les modèles, telles que la connexion à la base de données ou la gestion des requêtes SQL.
- Le fichier `credentials.php` : utilisé pour stocker les informations de connexion à la base de données ou d'autres informations sensibles. 
- Le répertoire `Utils `: contient des fonctions réutilisables dans tout le projet. À l'intérieur, vous trouverez :
- Le fichier `functions.php` : contient  des fonctions utilitaires qui peuvent être utilisées à plusieurs endroits dans le projet. 
- Le répertoire `Views`: où sont stockées les vues, qui sont responsables de l'affichage des données et de l'interface utilisateur.
- Le fichier `index.php`: orchestre le flux de contrôle de l'application, dirigeant les requêtes HTTP vers les contrôleurs appropriés pour le traitement.

## Comment se connecter sur le site ?

L'identifiant de connexion est un nombre compris entre 1 et 40 pour chaque utilisateur

Le mot de passe est :
```
Topaze
```