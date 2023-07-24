const express = require('express');
const router = express.Router();

// Sample data for testing
const bookings = [
    { id: 1, name: 'John Doe', date: '2023-07-20' },
    { id: 2, name: 'Jane Smith', date: '2023-07-21' },
];

// Test route to return sample data
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Test route', bookings });
});

module.exports = router;
