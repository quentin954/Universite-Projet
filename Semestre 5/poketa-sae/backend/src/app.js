const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const cardRoutes = require('./routes/cardRoutes');
const adminRoutes = require('./routes/adminRoutes');
const config = require('./config/env'); 

const app = express();

app.use(cors({
    origin: config.frontendUrl || 'http://localhost:3000',  // Autorise le frontend React
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'],  // En-têtes autorisés
}));

//Variables quelconc
const apiUrl = "/mypokemonlist/v1"

// Middleware global
app.use(express.json());

// Définition des routes avec l'URL de base
app.use(apiUrl +'/users', userRoutes);
app.use(apiUrl +'/collections', collectionRoutes);
app.use(apiUrl +'/cards', cardRoutes);
app.use(apiUrl +'/admin', adminRoutes);

// Gestion des erreurs globales
const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running!' });
});

module.exports = app;