import express from 'express';
import { validateVoucherController } from '../controllers/validateVoucher';

const router = express.Router();

// Validate a voucher
router.post('/', validateVoucherController);

module.exports = function voucherValidationRouter(req, res, next) {
    // Use the router as middleware
    router(req, res, next);
};
