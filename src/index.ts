const express = require('express');
import mongoose from 'mongoose';
const reservationRouter = require('./routes/reservationRouter');
const voucherValidationRouter = require('./routes/voucherValidationRouter');
const registerUserRouter = require('./routes/registerUserRouter');
const app = express();
require('dotenv').config();
app.use(express.json());
const port = 5000;

// Middleware to handle redirects
app.use((req, res, next) => {
    // Modify this condition to check if the user is authenticated based on your implementation
    // For example, you might use req.isAuthenticated() or check if there's a valid access token in the request headers.
    const isAuthenticated = true; // Replace this with your actual authentication check

    if (!isAuthenticated) {
        // If user is not authenticated (not logged in), redirect to the captive portal URL
        return res.redirect(302, 'https://example.com/captive-portal');
    }
    // If user is authenticated, proceed to the requested destination
    next();
});

app.use('/reservations', reservationRouter);
app.use('/register', registerUserRouter);
app.use('/validate', voucherValidationRouter);

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
