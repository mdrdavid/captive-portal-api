import { Request, Response } from 'express';
import { validateVoucher } from '../services/validateVoucher';

export async function validateVoucherController(req: Request, res: Response) {
    try {
        const { voucher, macAddress } = req.body;

        const accessToken = await validateVoucher(voucher, macAddress);

        res.json({ message: 'Access granted', accessToken });
    } catch (err) {
        console.error('Error validating voucher:', err);
        res.status(500).json({ error: 'Failed to validate voucher' });
    }
}
