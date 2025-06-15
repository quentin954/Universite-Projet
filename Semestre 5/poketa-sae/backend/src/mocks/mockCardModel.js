const mockData = [
  {
    "name": "Écarlate et Violet",
    "startDate": "",
    "endDate": "",
    "nbExtension": 13,
    "theme": "",
    "newFeatures": [],
    "extensions": [
      {
        "name": "Étincelles Déferlantes",
        "Code": "SSP",
        "releaseDate": "08/11/2024",
        "nbCards": 252,
        "nbSecrets": 61,
        "symbol": "https://www.pokecardex.com/assets/images/symboles/SSP.png",
        "logo": "https://www.pokecardex.com/assets/images/logos/SSP.png",
        "cards": [
          {
            "name": "Noeunoeuf",
            "type": [
              "Plante"
            ],
            "rarity": "Commune",
            "features": [],
            "numPok": "1",
            "image": "https://www.pokecardex.com/assets/images/sets/SSP/HD/1.jpg"
          },
          {
            "name": "Noeunoeuf",
            "type": [
              "Plante"
            ],
            "rarity": "Commune",
            "features": [],
            "numPok": "2",
            "image": "https://www.pokecardex.com/assets/images/sets/SSP/HD/2.jpg"
          },
          {
            "name": "Noadkoko",
            "type": [
              "Plante"
            ],
            "rarity": "Unco",
            "features": [],
            "numPok": "3",
            "image": "https://www.pokecardex.com/assets/images/sets/SSP/HD/3.jpg"
          },
        ]
      },
      {
        "name": "Duo de Choc",
        "Code": "SM09",
        "releaseDate": "01/02/2019",
        "nbCards": 196,
        "nbSecrets": 15,
        "symbol": "https://www.pokecardex.com/assets/images/symboles/SM09.png",
        "logo": "https://www.pokecardex.com/assets/images/logos/SM09.png",
        "cards": [
          {
            "name": "Celebi et Florizarre-GX",
            "type": [
              "Plante"
            ],
            "rarity": "Ultra-rare",
            "features": [],
            "numPok": "1",
            "image": "https://www.pokecardex.com/assets/images/sets/SM09/HD/1.jpg"
          },
          {
            "name": "Aspicot",
            "type": [
              "Plante"
            ],
            "rarity": "Commune",
            "features": [],
            "numPok": "2",
            "image": "https://www.pokecardex.com/assets/images/sets/SM09/HD/2.jpg"
          },
          {
            "name": "Aspicot",
            "type": [
              "Plante"
            ],
            "rarity": "Commune",
            "features": [],
            "numPok": "3",
            "image": "https://www.pokecardex.com/assets/images/sets/SM09/HD/3.jpg"
          },
          {
            "name": "Coconfort",
            "type": [
              "Plante"
            ],
            "rarity": "Unco",
            "features": [],
            "numPok": "4",
            "image": "https://www.pokecardex.com/assets/images/sets/SM09/HD/4.jpg"
          },
        ]
      }
    ]
  },
  {
    "name": "Épée et Bouclier",
    "startDate": "",
    "endDate": "",
    "nbExtension": 18,
    "theme": "",
    "newFeatures": [],
    "extensions": [
      {
        "name": "Zénith Suprême",
        "Code": "CRZ",
        "releaseDate": "20/01/2023",
        "nbCards": 230,
        "nbSecrets": 71,
        "symbol": "https://www.pokecardex.com/assets/images/symboles/CRZ.png",
        "logo": "https://www.pokecardex.com/assets/images/logos/CRZ.png",
        "cards": [
          {
            "name": "Mystherbe",
            "type": [
              "Plante"
            ],
            "rarity": "Commune",
            "features": [],
            "numPok": "1",
            "image": "https://www.pokecardex.com/assets/images/sets/CRZ/HD/1.jpg"
          },
          {
            "name": "Ortide",
            "type": [
              "Plante"
            ],
            "rarity": "Unco",
            "features": [],
            "numPok": "2",
            "image": "https://www.pokecardex.com/assets/images/sets/CRZ/HD/2.jpg"
          },
          {
            "name": "Joliflor",
            "type": [
              "Plante"
            ],
            "rarity": "Rare",
            "features": [],
            "numPok": "3",
            "image": "https://www.pokecardex.com/assets/images/sets/CRZ/HD/3.jpg"
          },
          {
            "name": "Saquedeneu",
            "type": [
              "Plante"
            ],
            "rarity": "Commune",
            "features": [],
            "numPok": "4",
            "image": "https://www.pokecardex.com/assets/images/sets/CRZ/HD/4.jpg"
          },
        ]
      }
    ]
  }
];

const getAllBlocksAndExtensions = async () => {
    return mockData;
};

const findBlockByExtensionCode = async (code) => {
    return mockData.find(block => block.extensions.some(ext => ext.Code === code));
};

module.exports = {
    getAllBlocksAndExtensions,
    findBlockByExtensionCode
};