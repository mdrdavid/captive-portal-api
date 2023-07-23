import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');
import User, { IUser } from '../models/user';
import { generateVoucher } from '../utils/generateVoucher';

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

    // Check if the password is not empty or undefined
    if (!password) {
        throw new Error('Password is required');
    }
    // Generate a unique voucher using UUID
    const voucher = generateVoucher(8);

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

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
