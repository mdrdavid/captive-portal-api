import { Model } from 'mongoose';
import { Reservation as ReservationModel } from '../models/reservation';
const sendEmail = require('../nodemailer/emailTransporter'); // Import the sendEmail function

class ReservationService {
    private reservation: Model<ReservationModel>;

    constructor(reservation: Model<ReservationModel>) {
        this.reservation = reservation;
    }

    public async createReservation(
        reservationData: any
    ): Promise<ReservationModel> {
        const reservation = new this.reservation(reservationData);
        const createdReservation = await reservation.save();

        // Send email notification to the restaurant
        const restaurantEmail = 'davidmatovu88@gmail.com'; // to be replaced with the restaurant's email address
        const emailSubject = 'New Reservation!';
        const emailTemplate = 'reservationEmail'; // from email.handlebars template
        const emailContext = {
            name: reservationData.firstName,
            email: reservationData.email,
            numberOfPeople: reservationData.numberOfPeople,
            reservationId: createdReservation._id, // Add reservationId to the email context
        };

        sendEmail(restaurantEmail, emailSubject, emailTemplate, emailContext);

        return createdReservation;
    }

    public async confirmReservation(
        id: string
    ): Promise<ReservationModel | null> {
        const reservation = await this.reservation.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true }
        );

        if (!reservation) {
            return null;
        }

        // Send email notification to the client
        const clientEmail = reservation.email;
        const emailSubject = 'Reservation Confirmation';
        const emailTemplate = 'confirmationEmail'; // from the email.handlebars template
        const emailContext = {
            name: reservation.firstName,
            email: reservation.email,
            numberOfPeople: reservation.numberOfPeople,
            company: 'Nyama',
        };

        sendEmail(clientEmail, emailSubject, emailTemplate, emailContext);

        return reservation;
    }
}

export default ReservationService;
