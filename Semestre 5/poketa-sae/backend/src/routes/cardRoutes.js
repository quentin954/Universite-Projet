const express = require('express');
const cardController = require('../controllers/cardController');
const { validateMiddleware, schemas } = require('../middlewares/validateMiddleware');

const router = express.Router();

// Route pour récupérer tous les blocs et leurs extensions associées
router.get('/blocs-extensions', cardController.getAllBlocksAndExtensions);

// Route pour récupérer une extension spécifique par son ID
router.get('/extensions/:extensionId', cardController.getExtensionsById);

router.post('/search/live', validateMiddleware(schemas.liveSearchSchema), cardController.searchLive);

router.post('/search/complete', validateMiddleware(schemas.completeSearchSchema), cardController.searchComplete);
//router.get('/cards/search/complete/pikachu', cardController.searchCards);

module.exports = router;