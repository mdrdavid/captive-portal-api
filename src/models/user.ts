import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    macAddress: string;
    accessToken: string;
    voucher: string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    macAddress: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    voucher: { type: String, required: true, unique: true },
});

export default mongoose.model<IUser>('User', userSchema);
