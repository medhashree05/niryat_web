import express from 'express';
import { AddressController } from '../controllers/addressController.js';

const router = express.Router();

router.post('/', AddressController.createAddress);
router.get('/:userId', AddressController.getAddressesByUser);
export default router;
