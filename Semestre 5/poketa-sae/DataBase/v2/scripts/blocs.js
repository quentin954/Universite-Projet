db.createCollection("blocs", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "title": "blocs",
      "required": ["name", "startDate", "endDate", "nbExtension"],
      "properties": {
        "name": {
          "bsonType": "string"
        },
        "startDate": {
          "bsonType": "date"
        },
        "endDate": {
          "bsonType": "date"
        },
        "nbExtension": {
          "bsonType": "int"
        },
        "theme": {
          "bsonType": "string"
        },
        "newFeatures": {
          "bsonType": "array",
          "items": {
            "bsonType": "string"
          }
        },
        "extensions": {
          "bsonType": "array",
          "items": {
            "title": "object",
            "required": ["name", "releaseDate"],
            "properties": {
              "name": {
                "bsonType": "string"
              },
              "Code": {
                "bsonType": "string"
              },
              "releaseDate": {
                "bsonType": "date"
              },
              "nbCards": {
                "bsonType": "int"
              },
              "nbSecrets": {
                "bsonType": "int"
              },
              "cards": {
                "bsonType": "array",
                "items": {
                  "title": "object",
                  "required": ["name", "rarity", "numExt", "numPok"],
                  "properties": {
                    "name": {
                      "bsonType": "string"
                    },
                    "type": {
                      "bsonType": "array",
                      "items": {
                        "bsonType": "string"
                      }
                    },
                    "rarity": {
                      "bsonType": "string"
                    },
                    "features": {
                      "bsonType": "array",
                      "items": {
                        "bsonType": "string"
                      }
                    },
                    "numExt": {
                      "bsonType": "string"
                    },
                    "numPok": {
                      "bsonType": "int"
                    },
                    "image": {
                      "bsonType": "string"
                    }
                  }
                }  
              },
              "symbol": {
                "bsonType": "string"
              },
              "logo": {
                "bsonType": "string"
              }
            }
          }  
        }
      }  
    } 
  },
  "autoIndexId": true
});
