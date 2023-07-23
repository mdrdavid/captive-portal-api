import { Request, Response } from 'express';
import ReservationService from '../services/reservation';
const sendEmail = require('../nodemailer/emailTransporter'); // Import the sendEmail function

class ReservationController {
    private reservationService: ReservationService;

    constructor(reservationService: ReservationService) {
        this.reservationService = reservationService;
    }

    public createReservation = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const reservationData = req.body;
            const reservation = await this.reservationService.createReservation(
                reservationData
            );
            res.json({
                message: 'Reservation created successfully',
                reservation,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create reservation' });
        }
    };

    public confirmReservation = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const reservation =
                await this.reservationService.confirmReservation(id);
            if (!reservation) {
                res.status(404).json({ message: 'Reservation not found' });
                return;
            }
            res.json({
                message: 'Reservation confirmed successfully',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to confirm reservation' });
        }
    };
}

export default ReservationController;
