db.createCollection("collections", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "title": "collections",
      "required": ["users"],
      "properties": {
        "users": {
          "bsonType": "objectId"
        },
        "cards": {
          "bsonType": "array",
          "items": {
            "title": "object",
            "required": ["quantity", "card"],
            "properties": {
              "quantity": {
                "bsonType": "int"
              },
              "card": {
                "bsonType": "object",
                "title": "object",
                "required": ["name", "type"],
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
                  "numPok": {
                    "bsonType": "int"
                  },
                  "image": {
                    "bsonType": "string"
                  },
                  "extension": {
                    "bsonType": "string"
                  },
                  "bloc": {
                    "bsonType": "string"
                  }
                }  
              }
            }
          }  
        }
      }  
    } 
  },
  "autoIndexId": true
});
