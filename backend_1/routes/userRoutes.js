// routes/userRoutes.js
import express from 'express';
import { UserController } from '../controllers/userController.js';
import { validateRegistration, validateLogin } from '../middleware/validationMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/register', validateRegistration, UserController.register);
router.post('/login', validateLogin, UserController.login);

// Example protected route
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
router.put('/profile', authMiddleware, UserController.updateProfile);
router.put('/change-password', authMiddleware, UserController.changePassword);

export default router;
