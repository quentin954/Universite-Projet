db.createCollection("generations", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "title": "generations",
      "required": ["name", "startYear", "endYear", "seriesIds"],
      "properties": {
        "name": {
          "bsonType": "string"
        },
        "startYear": {
          "bsonType": "date"
        },
        "endYear": {
          "bsonType": "date"
        },
        "seriesIds": {
          "bsonType": "array"
        }
      }  
    } 
  },
  "autoIndexId": true
});
