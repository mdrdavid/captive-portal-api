import express from 'express';
import { registerUserController } from '../controllers/registerUser';

const router = express.Router();

// User registration with voucher
router.post('/', registerUserController);

module.exports = function registerUserRouter(req, res, next) {
    // Use the router as middleware
    router(req, res, next);
};
