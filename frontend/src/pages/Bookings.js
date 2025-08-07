import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Bookings.css';

const Bookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);

  const handleDeleteBooking = async (bookingId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      if (res.status === 204) {
        setBookings(prev => prev.filter(b => b._id !== bookingId));
      }
    } catch (err) {
      alert('Failed to delete booking.');
    }
  };

  useEffect(() => {
    if (!user?._id) return;
    fetch(`http://localhost:5000/api/bookings?buyerId=${user._id}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => {
        console.error('Error fetching bookings:', err);
      });
  }, [user]);

  return (
    <div className="bookings-container">
      <h1 className="bookings-title">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="bookings-empty">No booked cars found.</div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <Link to={`/car/${booking.carId._id}`} className="bookings-card" key={booking._id}>
              <img
                className="bookings-img"
                src={`http://localhost:5000${booking.carId.images && booking.carId.images.length > 0 ? booking.carId.images[0] : ''}`}
                alt={booking.carId.title}
              />
              <div className="bookings-card-content">
                <h2 className="bookings-car-title">{booking.carId.brand}<br/>{booking.carId.model}</h2>
                <div className="bookings-price">₹{booking.carId.price.toLocaleString('en-IN')}</div>
                <div className="bookings-payment-status">Payment: {booking.paymentStatus}</div>
                <button
                  className="delete-booking"
                  onClick={e => {
                    e.preventDefault();
                    handleDeleteBooking(booking._id);
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;