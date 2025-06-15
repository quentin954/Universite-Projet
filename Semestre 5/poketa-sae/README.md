# **Poketa**

Une application conçue pour gérer et suivre votre collection de cartes Pokémon. Elle permet aux utilisateurs de répertorier facilement les cartes qu'ils possèdent dans la vraie vie, offrant un moyen pratique d'organiser leur collection et d'en assurer le suivi.

---

## **Pré-requis**

Avant de pouvoir lancer le backend et le frontend, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** (v16 ou supérieur) : [Télécharger Node.js](https://nodejs.org/)
- **MongoDB** (base de données NoSQL) : [Télécharger MongoDB](https://www.mongodb.com/try/download/community)

---

## **Installation**

### 1. Cloner le dépôt

```bash
git clone https://gitlab.sorbonne-paris-nord.fr/paqueta-s5/paqueta.git
cd paqueta
```

---

## **Backend**

### **Configuration**

1. Rendez-vous dans le dossier `backend` :
   ```bash
   cd backend
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```
   
### **Lancement**

- En mode développement (avec rechargement automatique grâce à `nodemon`) :
  ```bash
  npm run dev
  ```

- En mode production :
  ```bash
  npm start
  ```

Le backend sera accessible sur [http://localhost:5000](http://localhost:5000).

---

## **Frontend**

### **Configuration**

1. Rendez-vous dans le dossier `frontend` :
   ```bash
   cd ../frontend
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

### **Lancement**

- En mode développement :
  ```bash
  npm start
  ```

- Pour générer une version de production :
  ```bash
  npm run build
  ```

Le frontend sera accessible sur [http://localhost:3000](http://localhost:3000).