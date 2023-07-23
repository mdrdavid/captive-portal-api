// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { registerUser } from '../services/registerUser';

export async function registerUserController(req: Request, res: Response) {
    try {
        const { email, password, macAddress } = req.body;

        const user = await registerUser(email, password, macAddress);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
}
