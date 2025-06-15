db.createCollection("users", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "title": "users",
      "required": ["username", "email", "password", "createdAt", "profile", "settings", "status", "security", "lastLogin", "ipHistory", "tokens", "userCollection"],
      "properties": {
        "username": {
          "bsonType": "string"
        },
        "email": {
          "bsonType": "string"
        },
        "password": {
          "bsonType": "string"
        },
        "phone": {
          "bsonType": "string"
        },
        "createdAt": {
          "bsonType": "date"
        },
        "updatedAt": {
          "bsonType": "date"
        },
        "profile": {
          "bsonType": "object",
          "title": "object",
          "properties": {
            "firstName": {
              "bsonType": "string"
            },
            "lastName": {
              "bsonType": "string"
            },
            "avatarUrl": {
              "bsonType": "string"
            },
            "bio": {
              "bsonType": "string"
            },
            "dateOfBirth": {
              "bsonType": "string"
            }
          }  
        },
        "settings": {
          "bsonType": "object",
          "title": "object",
          "required": ["notifications"],
          "properties": {
            "language": {
              "bsonType": "string"
            },
            "theme": {
              "bsonType": "string"
            },
            "notifications": {
              "bsonType": "object",
              "title": "object",
              "required": ["email", "sms", "push"],
              "properties": {
                "email": {
                  "bsonType": "bool"
                },
                "sms": {
                  "bsonType": "bool"
                },
                "push": {
                  "bsonType": "bool"
                }
              }  
            }
          }  
        },
        "roles": {
          "bsonType": "array"
        },
        "status": {
          "bsonType": "object",
          "title": "object",
          "required": ["isActive", "isMailVerified", "isPhoneVerified", "banned"],
          "properties": {
            "isActive": {
              "bsonType": "bool"
            },
            "isMailVerified": {
              "bsonType": "bool"
            },
            "isPhoneVerified": {
              "bsonType": "bool"
            },
            "banned": {
              "bsonType": "object",
              "title": "object",
              "required": ["isBanned"],
              "properties": {
                "isBanned": {
                  "bsonType": "bool"
                },
                "reason": {
                  "bsonType": "string"
                },
                "banDate": {
                  "bsonType": "date"
                }
              }  
            }
          }  
        },
        "security": {
          "bsonType": "object",
          "title": "object",
          "required": ["twoFactorAuth"],
          "properties": {
            "twoFactorAuth": {
              "bsonType": "object",
              "title": "object",
              "required": ["enabled"],
              "properties": {
                "enabled": {
                  "bsonType": "bool"
                },
                "method": {
                  "bsonType": "string"
                }
              }  
            }
          }  
        },
        "lastLogin": {
          "bsonType": "date"
        },
        "ipHistory": {
          "bsonType": "array"
        },
        "tokens": {
          "bsonType": "object",
          "title": "object",
          "required": ["accessToken", "emailVerification", "passwordReset"],
          "properties": {
            "accessToken": {
              "bsonType": "object",
              "title": "object",
              "required": ["value", "expiresAt"],
              "properties": {
                "value": {
                  "bsonType": "string"
                },
                "expiresAt": {
                  "bsonType": "date"
                }
              }  
            },
            "emailVerification": {
              "bsonType": "object",
              "title": "object",
              "required": ["token", "expiresAt", "used"],
              "properties": {
                "token": {
                  "bsonType": "string"
                },
                "expiresAt": {
                  "bsonType": "date"
                },
                "used": {
                  "bsonType": "bool"
                }
              }  
            },
            "passwordReset": {
              "bsonType": "object",
              "title": "object",
              "required": ["token", "expiresAt", "used"],
              "properties": {
                "token": {
                  "bsonType": "string"
                },
                "expiresAt": {
                  "bsonType": "date"
                },
                "used": {
                  "bsonType": "bool"
                }
              }  
            }
          }  
        },
        "userCollection": {
          "bsonType": "object",
          "title": "object",
          "required": ["nbCards"],
          "properties": {
            "nbCards": {
              "bsonType": "int"
            },
            "collections": {
              "bsonType": "array"
            }
          }  
        }
      }  
    } 
  },
  "autoIndexId": true
});
