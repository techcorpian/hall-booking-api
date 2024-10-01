const express = require('express');
const app = express();
const roomsRoutes = require('./routes/rooms');
const bookingsRoutes = require('./routes/bookings');
const customersRoutes = require('./routes/customers');

app.use(express.json());

// Use the routes
app.use('/rooms', roomsRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/customers', customersRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
