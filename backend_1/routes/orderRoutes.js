import express from 'express';
import { OrderController } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/place', authMiddleware, OrderController.placeOrder);
router.get('/user/:userId', authMiddleware, OrderController.getOrdersByUser);

export default router;