import { Router } from 'express';
import ReservationController from '../controllers/reservation';
import ReservationService from '../services/reservation';
import { ReservationModel } from '../models/reservation';

// Create a new router instance
const router = Router();

// Create instances of the controller and service
const reservationService = new ReservationService(ReservationModel);
const reservationController = new ReservationController(reservationService);

// Define your routes
router.post('/', reservationController.createReservation);
router.get('/:id/confirm', reservationController.confirmReservation);

// Export the middleware function
module.exports = function reservationRouter(req, res, next) {
    // Use the router as middleware
    router(req, res, next);
};
