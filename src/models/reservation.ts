import mongoose, { Schema, Document } from 'mongoose';

// Define the reservation interface
export interface Reservation extends Document {
    firstName: string;
    lastName: string;
    email: string;
    numberOfPeople: number;
    isActive: boolean;
}

// Create the reservation schema
const reservationSchema = new Schema<Reservation>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    isActive: { type: Boolean, default: false },
});

// Create the Reservation model
export const ReservationModel = mongoose.model<Reservation>(
    'Reservation',
    reservationSchema
);
