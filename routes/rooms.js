const express = require('express');
const router = express.Router();
const { rooms } = require('../data');

// Create a new room
router.post('/', (req, res) => {
    const { roomName, seatsAvailable, amenities, pricePerHour } = req.body;

    const newRoom = {
        roomId: rooms.length + 1,
        roomName,
        seatsAvailable,
        amenities,
        pricePerHour,
        bookings: [] // Store bookings for the room
    };
    rooms.push(newRoom);
    res.status(201).json(newRoom);
});

// List all rooms with their booking data
router.get('/', (req, res) => {
    const roomList = rooms.map(room => ({
        roomName: room.roomName,
        bookings: room.bookings.map(booking => ({
            customerName: booking.customerName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
        }))
    }));
    res.json(roomList);
});

module.exports = router;
