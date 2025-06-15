db.createView(
  "cardsBySeries",  // Nom de la vue
  "cards",          // Collection source
  [
    // Étape 1 : Lookup pour récupérer les informations de la série correspondante
    {
      $lookup: {
        from: "series",          // Collection à joindre
        localField: "seriesId",  // Champ dans "cards"
        foreignField: "_id",     // Champ correspondant dans "series"
        as: "seriesInfo"         // Nom du champ de sortie
      }
    },
    // Étape 2 : Unwind pour décompresser le tableau seriesInfo
    {
      $unwind: "$seriesInfo"
    },
    // Étape 3 : Regrouper par série
    {
      $group: {
        _id: "$seriesId",                          // Groupement par ID de la série
        seriesName: { $first: "$seriesInfo.name" },// Récupérer le nom de la série
        totalCards: { $sum: 1 },                   // Nombre total de cartes par série
        cards: {                                   // Liste des cartes
          $push: {
            name: "$name",
            rarity: "$rarity",
            type: "$type",
            number: "$number",
            imageUrl: "$imageUrl"
          }
        }
      }
    }
  ]
);

