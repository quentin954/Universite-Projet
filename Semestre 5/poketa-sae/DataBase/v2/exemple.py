# EXEMPLE FORMAT JSON FICTIF

# données fictif en anglais, mais sur notre site, ce sera en francais

users = [
  {
    "_id": "63f1dca0a7b8c7b4a1d1c900",
    "username": "PokeMaster",
    "email": "pokemaster@example.com",
    "password": "hashedpassword123",
    "phone": "+1234567890",
    "createdAt": "2024-12-01T12:34:56Z",
    "updatedAt": "2024-12-05T08:00:00Z",
    "profile": {
      "firstName": "Ash",
      "lastName": "Ketchum",
      "avatarUrl": "https://example.com/avatar.png",
      "bio": "Avid Pokémon collector and trainer.",
      "dateOfBirth": "1999-05-01"
    },
    "settings": {
      "language": "en",
      "theme": "dark",
      "notifications": {
        "email": True,
        "sms": False,
        "push": True
      }
    },
    "roles": ["user", "admin"],
    "status": {
      "isActive": True,
      "isMailVerified": True,
      "isPhoneVerified": False,
      "banned": {
        "isBanned": False,
        "reason": "",
        "banDate": None # null
      }
    },
    "security": {
      "twoFactorAuth": {
        "enabled": True,
        "method": "app"
      }
    },
    "lastLogin": "2024-12-04T22:15:30Z",
    "ipHistory": ["192.168.1.1", "192.168.1.2"],
    "tokens": {
      "accessToken": {
        "value": "accessToken123",
        "expiresAt": "2024-12-10T12:00:00Z"
      },
      "emailVerification": {
        "token": "emailToken123",
        "expiresAt": "2024-12-06T12:00:00Z",
        "used": True
      },
      "passwordReset": {
        "token": "resetToken123",
        "expiresAt": "2024-12-07T12:00:00Z",
        "used": False
      }
    }
  }
]


collections = [
  {
    "_id": "63f1dcf1a7b8c7b4a1d1c901",
    "users": "63f1dca0a7b8c7b4a1d1c900",
    "cards": [
      {
        "_id": "78s1dcf1a7b8c7b4a1d1c901",
        "quantity": 2,
        "card": {
          "name": "Pikachu VMAX",
          "type": ["Electric"],
          "rarity": "Rare",
          "features": ["Holo", "Full Art"],
          "numPok": "045",
          "image": "https://example.com/pikachu_vmax.png",
          "extension": "Vivid Voltage",
          "bloc": "Sword & Shield"
        }
      },
      {
        "_id": "98g1dcf1a7b8c7b4a1d1c901",
        "quantity": 1,
        "card": {
          "name": "Charizard GX",
          "type": ["Fire"],
          "rarity": "Legendary",
          "features": ["Shiny", "Full Art"],
          "numPok": "006",
          "image": "https://example.com/charizard_gx.png",
          "extension": "Hidden Fates",
          "bloc": "Sun & Moon"
        }
      }
    ]
  }
]


blocs = [
  {
    "_id": "63f1dd45a7b8c7b4a1d1c902",
    "name": "Sword & Shield",
    "startDate": "2020-02-07T00:00:00Z",
    "endDate": "2022-11-18T00:00:00Z",
    "nbExtension": 12,
    "theme": "Modern Era",
    "newFeatures": ["V cards", "VMAX cards", "Galar Region"],
    "extensions": [
      {
        "_id": "63f1dd67a7b8c7b4a1d1c903",
        "name": "Vivid Voltage",
        "Code": "VV",
        "releaseDate": "2020-11-13T00:00:00Z",
        "nbCards": 203,
        "nbSecrets": 10,
        "cards": [
          {
            "name": "Pikachu VMAX",
            "type": ["Electric"],
            "rarity": "Rare",
            "features": ["Holo", "Full Art"],
            "numPok": "045",
            "image": "https://example.com/pikachu_vmax.png"
          }
        ],
        "symbol": "https://example.com/pzaeaze.png",
        "logo": "https://example.com/pzaeaze.png"
      }
    ]
  }
]
