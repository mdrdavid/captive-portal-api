const express = require('express');
import mongoose from 'mongoose';
import User, { IUser } from './models/user';
const reservationRouter = require('./routes/reservationRouter');
const voucherValidationRouter = require('./routes/voucherValidationRouter');
const registerUserRouter = require('./routes/registerUserRouter');
const bookingsRouter = require('./routes/testRouter');
const app = express();
require('dotenv').config();
app.use(express.json());
const port = 5000;

// Middleware to handle redirects

app.use((req, res, next) => {
    // Modify this condition to check if the user is authenticated based on the access token in the request headers
    const accessToken = req.headers.authorization; // Assuming the access token is passed in the Authorization header

    if (!accessToken || !isValidAccessToken(accessToken)) {
        // If the access token is missing or invalid, redirect to the captive portal URL
        return res.redirect(302, 'http://localhost:3000/login');
    }
    // If the access token is valid, proceed to the requested destination
    next();
});
app.use('/reservations', reservationRouter);
app.use('/register', registerUserRouter);
app.use('/validate', voucherValidationRouter);
app.use('/bookings', bookingsRouter); // Use the reservationRouter with the base URL '/reservations'

// Connect to the MongoDB database
mongoose
    .connect(process.env.MONGOOSE_URL)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

app.listen(port, () => {
    console.log(`cafePortalProject is listening at http://localhost:${port}`);
});

// Function to check the validity of the access token
async function isValidAccessToken(accessToken: string): Promise<boolean> {
    try {
        // Check if a user with the provided access token exists in the database
        const user: IUser | null = await User.findOne({ accessToken });
        return user !== null; // Return true if the user exists; otherwise, return false.
    } catch (error) {
        console.error('Error validating access token:', error);
        return false; // Return false if an error occurs during validation
    }
}
