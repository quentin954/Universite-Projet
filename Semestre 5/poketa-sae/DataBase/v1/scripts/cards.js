db.createCollection("cards", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "title": "cards",
      "required": ["seriesId", "name", "type", "rarity", "number", "imageUrl"],
      "properties": {
        "seriesId": {
          "bsonType": "objectId"
        },
        "name": {
          "bsonType": "string"
        },
        "type": {
          "bsonType": "array"
        },
        "rarity": {
          "bsonType": "string"
        },
        "number": {
          "bsonType": "string"
        },
        "imageUrl": {
          "bsonType": "string"
        }
      }  
    } 
  }
});
