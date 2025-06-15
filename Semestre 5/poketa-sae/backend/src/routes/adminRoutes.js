const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Récupérer tous les utilisateurs (admin uniquement)
router.get('/users', authenticate, isAdmin, adminController.getAllUsers);

// Supprimer un utilisateur spécifique (admin uniquement)
router.delete('/users/:userId', authenticate, isAdmin, adminController.deleteUser);

module.exports = router;