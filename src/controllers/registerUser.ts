import { Request, Response } from 'express';
import { registerUser } from '../services/registerUser';

export async function registerUserController(req: Request, res: Response) {
    try {
        const { email, password, macAddress } = req.body;
        const ipAddress = req.socket.remoteAddress;
        const user = await registerUser(email, password, macAddress, ipAddress);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
}
