const { getCollection } = require('../config/db');

const initializeLiveSearch = async () => {
    try {
        const liveSearchCollection = getCollection('live_search');
        const liveSearchCount = await liveSearchCollection.countDocuments();
        
        if (liveSearchCount === 0) {
            console.log("La collection 'live_search' est vide. Initialisation en cours...");

            let termsSet = new Set();

            const blocsCollection = getCollection('blocs');

            // Extraction des termes de "blocs" : "name"
            const blocsTerms = await blocsCollection.aggregate([
                {
                    $project: {
                        terms: ["$name"]
                    }
                },
                { $unwind: "$terms" },
                { $group: { _id: "$terms" } },
                { $addFields: { term: "$_id", type: "bloc", preview: null } },
                { $project: { _id: 0 } }
            ]).toArray();

            blocsTerms.forEach(term => termsSet.add(JSON.stringify(term)));

            // Extraction des termes de "extensions" : "name"
            const extensionTerms = await blocsCollection.aggregate([
                { $unwind: "$extensions" },
                {
                    $project: {
                        terms: ["$extensions.name"],
                        preview: "$extensions.symbol"
                    }
                },
                { $unwind: "$terms" },
                { $group: { _id: "$terms", preview: { $first: "$preview" } } },
                { $addFields: { term: "$_id", type: "extension" } },
                { $project: { _id: 0 } }
            ]).toArray();

            extensionTerms.forEach(term => termsSet.add(JSON.stringify(term)));

            // Extraction des termes de "cards" : "name", "type", "rarity"
            const cardTerms = await blocsCollection.aggregate([
                { $unwind: "$extensions" },
                { $unwind: "$extensions.cards" },
                {
                    $project: {
                        cardName: "$extensions.cards.name",
                        cardTypes: "$extensions.cards.type",
                        cardRarity: "$extensions.cards.rarity",
                        preview: "$extensions.cards.image"
                    }
                },
                { $group: { _id: "$cardName", preview: { $first: "$preview" } } },
                { $addFields: { term: "$_id", type: "carte" } },
                { $project: { _id: 0 } }
            ]).toArray();

            cardTerms.forEach(term => termsSet.add(JSON.stringify(term)));

            // Extraction des termes de "type" dans les cartes
            const typeTerms = await blocsCollection.aggregate([
                { $unwind: "$extensions" },
                { $unwind: "$extensions.cards" },
                { $unwind: "$extensions.cards.type" },
                {
                    $project: {
                        term: "$extensions.cards.type",
                        type: "type",
                        preview: null
                    }
                },
                { $group: { _id: "$term" } },
                { $addFields: { term: "$_id", type: "type", preview: null } },
                { $project: { _id: 0 } }
            ]).toArray();

            typeTerms.forEach(term => termsSet.add(JSON.stringify(term)));

            // Extraction des termes de "rarity" dans les cartes
            const rarityTerms = await blocsCollection.aggregate([
                { $unwind: "$extensions" },
                { $unwind: "$extensions.cards" },
                {
                    $project: {
                        term: "$extensions.cards.rarity",
                        type: "rarity",
                        preview: null
                    }
                },
                { $group: { _id: "$term" } },
                { $addFields: { term: "$_id", type: "rarity", preview: null } },
                { $project: { _id: 0 } }
            ]).toArray();

            rarityTerms.forEach(term => termsSet.add(JSON.stringify(term)));

            // Insertion des termes uniques dans la collection 'live_search'
            const liveSearchTerms = Array.from(termsSet).map(termString => JSON.parse(termString));

            if (liveSearchTerms.length > 0) {
                await liveSearchCollection.insertMany(liveSearchTerms);
                console.log(`${liveSearchTerms.length} termes insérés dans 'live_search'.`);
            } else {
                console.log("Aucun terme à insérer dans 'live_search'.");
            }

            // Ajout des index pour une recherche rapide
            await liveSearchCollection.createIndex({ term: 1 });
            await liveSearchCollection.createIndex({ type: 1 });
            await liveSearchCollection.createIndex({ term: 1, type: 1 });

            console.log("Les index ont été ajoutés à la collection 'live_search'.");
            console.log("La collection 'live_search' a été initialisée avec succès.");
        } else {
            console.log("La collection 'live_search' contient déjà des données.");
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la collection 'live_search' :", error);
    }
};

module.exports = {
    initializeLiveSearch
};