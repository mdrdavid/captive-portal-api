const express = require('express');
import mongoose from 'mongoose';
const reservationRouter = require('./routes/reservationRouter');
const voucherValidationRouter = require('./routes/voucherValidationRouter');
const registerUserRouter = require('./routes/registerUserRouter');
const app = express();
require('dotenv').config();
app.use(express.json());
const port = 5000;

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
