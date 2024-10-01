const express = require('express');
const router = express.Router();
const { bookings, rooms } = require('../data');

// List all customers with their booking data
router.get('/', (req, res) => {
    const customerBookings = bookings.map(booking => ({
        customerName: booking.customerName,
        roomName: rooms.find(room => room.roomId === booking.roomId).roomName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime
    }));
    res.json(customerBookings);
});

// List how many times a customer has booked a room
router.get('/:customerName/bookings', (req, res) => {
    const { customerName } = req.params;
    const customerBookingDetails = bookings
        .filter(booking => booking.customerName === customerName)
        .map(booking => ({
            customerName: booking.customerName,
            roomName: rooms.find(room => room.roomId === booking.roomId).roomName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingId: booking.bookingId,
            bookingDate: booking.date,
            bookingStatus: "Confirmed" // Static status for now
        }));

    if (customerBookingDetails.length === 0) {
        return res.status(404).json({ message: "No bookings found for this customer" });
    }

    res.json(customerBookingDetails);
});

module.exports = router;
