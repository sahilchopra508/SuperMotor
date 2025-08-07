const express = require('express');
const connectDB = require('./DB/connect');
const cors = require('cors');

const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const sellRoutes = require('./routes/sellRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

connectDB();

app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api', sellRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});



