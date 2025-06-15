const express = require('express');
const collectionController = require('../controllers/collectionController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validateMiddleware, schemas } = require('../middlewares/validateMiddleware');

const router = express.Router();

// Récupérer la collection de l'utilisateur connecté
router.get('/', authenticate, collectionController.getUserCollection);

// Ajouter une carte dans la collection de l'utilisateur
router.post('/card', authenticate, validateMiddleware(schemas.addCardSchema), collectionController.addCardToCollection);

// Mettre à jour la quantité d'une carte spécifique dans la collection
router.put('/card/:posId', authenticate, validateMiddleware(schemas.updateCardQuantitySchema), collectionController.updateCardQuantity);

// Supprimer une carte de la collection de l'utilisateur
router.delete('/card/:posId', authenticate, collectionController.deleteCardFromCollection);

module.exports = router;