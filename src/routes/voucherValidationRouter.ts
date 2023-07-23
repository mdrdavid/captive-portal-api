import express from 'express';
import { validateVoucherController } from '../controllers/validateVoucher';

const router = express.Router();

// Validate a voucher
router.post('/', validateVoucherController);

export default router;
