import express from 'express';
import { registerUserController } from '../controllers/registerUser';

const router = express.Router();

// User registration with voucher
router.post('/', registerUserController);

export default router;