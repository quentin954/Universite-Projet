const { getCollection } = require('../config/db');
const fs = require('fs');

const initializeBlocs = async () => {
    try {
        const blocsCollection = getCollection('blocs');
        const blocsCount = await blocsCollection.countDocuments();

        if (blocsCount === 0) {
            console.log('La collection "blocs" est vide. Initialisation en cours...');

            const data = fs.readFileSync('./blocs_data.json', 'utf-8');
            const blocsData = JSON.parse(data);

            await blocsCollection.insertMany(blocsData);
            console.log('La collection "blocs" a été initialisée avec succès.');
        } else {
            console.log('La collection "blocs" contient déjà des données.');
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la collection 'blocs' :", error);
    }
};

module.exports = {
    initializeBlocs
};