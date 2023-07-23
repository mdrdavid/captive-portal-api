const express = require('express');
import mongoose from 'mongoose';
const reservationRouter = require('./routes/reservationRouter');
const app = express();
app.use(express.json());
const port = 5000;

app.use('/reservations', reservationRouter);

// Connect to the MongoDB database
mongoose
    .connect(
        'mongodb+srv://david:david@cluster0.bkgfjsx.mongodb.net/reservation-portal'
    )
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

app.listen(port, () => {
    console.log(`cafePortalProject is listening at http://localhost:${port}`);
});
