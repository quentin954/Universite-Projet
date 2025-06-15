const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validateMiddleware, schemas } = require('../middlewares/validateMiddleware');

const router = express.Router();

// Inscription
router.post('/register', validateMiddleware(schemas.registerSchema), userController.registerUser);

// Connexion
router.post('/login', validateMiddleware(schemas.loginSchema), userController.loginUser);

// Profile
router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, validateMiddleware(schemas.updateProfileSchema), userController.updateUserProfile);

//router.put('/settings', authenticate, validateMiddleware(schemas.updateSettingsSchema), userController.updateUserSettings);

router.delete('/account', authenticate, userController.deleteUserAccount);
router.get('/status', authenticate, userController.getAccountStatus);

// Email verification
router.post('/verify-email', validateMiddleware(schemas.verifyEmailSchema), userController.verifyEmail);

// Change Password
router.put('/change-password', authenticate, validateMiddleware(schemas.changePasswordSchema), userController.changePassword);

// Password reset
router.post('/reset-password', validateMiddleware(schemas.resetPasswordRequestSchema), userController.requestPasswordReset);
router.post('/reset-password/confirm', validateMiddleware(schemas.resetPasswordConfirmSchema), userController.resetPassword);

module.exports = router;