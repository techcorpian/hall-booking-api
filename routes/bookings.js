const express = require('express');
const router = express.Router();
const { rooms, bookings, bookingIdCounter } = require('../data');

// Book a room
router.post('/', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    const room = rooms.find(r => r.roomId === roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Check if the room is available at the requested date and time
    const isBooked = room.bookings.some(booking => booking.date === date &&
        ((startTime >= booking.startTime && startTime < booking.endTime) || 
         (endTime > booking.startTime && endTime <= booking.endTime)));

    if (isBooked) {
        return res.status(400).json({ message: "Room already booked for the selected time." });
    }

    const newBooking = {
        bookingId: bookingIdCounter++,
        customerName,
        date,
        startTime,
        endTime,
        roomId
    };

    room.bookings.push(newBooking);
    bookings.push(newBooking);
    res.status(201).json(newBooking);
});

module.exports = router;
