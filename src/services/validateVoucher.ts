// import jwt from 'jsonwebtoken';
var jwt = require('jsonwebtoken');
import User, { IUser } from '../models/user';

const secretKey = 'davidmatovu';
export async function validateVoucher(
    voucher: string,
    macAddress: string
): Promise<string> {
    // Find the user by the provided voucher and MAC address
    const user: IUser | null = await User.findOne({ voucher, macAddress });

    if (!user) {
        throw new Error('Invalid voucher or MAC address');
    }

    // Generate an access token
    const accessToken = jwt.sign({ userId: user._id }, secretKey);

    // Update the user with the new access token
    user.accessToken = accessToken;
    await user.save();

    return accessToken;
}
