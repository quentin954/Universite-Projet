# **Dossier : Setup MongoDB et Collections**

Ce Dossier vous guide à travers la configuration de MongoDB et l'exécution de scripts automatisés avec `setup.sh`.
---

# **Attention ! : veuillez bien prendre la derniere version** => v2

---

## **Prérequis**

Avant de lancer le script, assurez-vous que les éléments suivants sont installés et configurés sur votre système :

### **1. MongoDB**
- **Installer MongoDB :**
  - Rendez-vous sur la [page officielle de MongoDB](https://www.mongodb.com/try/download/community) pour télécharger et installer MongoDB en fonction de votre système d'exploitation.
  - Assurez-vous que le service MongoDB est démarré.
  
- **Vérifiez l'installation :**
  Exécutez la commande suivante dans votre terminal :
  ```bash
  mongod --version
  ```
  Vous devriez voir la version installée de MongoDB.

### **2. Node.js**
- Installez Node.js (version 16 ou supérieure recommandée) en suivant les instructions sur le site officiel : [https://nodejs.org/](https://nodejs.org/).

- Vérifiez l'installation :
  ```bash
  node --version
  ```

---

## **Dépannage**
- **MongoDB ne démarre pas ?**
  - Assurez-vous que le service MongoDB est en cours d'exécution :
    ```bash
    sudo systemctl start mongod
    ```
  - Vérifiez l'état du service :
    ```bash
    sudo systemctl status mongod
    ```

- **Node.js non trouvé ?**
  - Installez Node.js comme mentionné dans les prérequis.

---



