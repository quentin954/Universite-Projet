db.createCollection("series", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "title": "series",
      "required": ["generationId", "name", "releaseDate", "totalCards", "secretCards", "cardsIds"],
      "properties": {
        "generationId": {
          "bsonType": "objectId"
        },
        "name": {
          "bsonType": "string"
        },
        "releaseDate": {
          "bsonType": "date"
        },
        "totalCards": {
          "bsonType": "int"
        },
        "secretCards": {
          "bsonType": "int"
        },
        "cardsIds": {
          "bsonType": "array"
        }
      }  
    } 
  }
});
