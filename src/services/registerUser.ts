// src/services/user.service.ts
import { v4 as uuidv4 } from 'uuid';
// import bcrypt from "bcrypt";
const bcrypt = require('bcrypt');
import User, { IUser } from '../models/user';

export async function registerUser(
    email: string,
    password: string,
    macAddress: string
): Promise<IUser> {
    // Check if the user with the provided MAC address already exists
    const existingUser: IUser | null = await User.findOne({ macAddress });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Generate a unique voucher using UUID
    const voucher = uuidv4();

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the generated voucher
    const user: IUser = await User.create({
        email,
        password: hashedPassword,
        macAddress,
        accessToken: '',
        voucher,
    });

    return user;
}
