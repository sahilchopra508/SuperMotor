import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = ({ user }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/wishlist/user/${user._id}`)
        .then(res => res.json())
        .then(data => {
          setWishlistItems(data);
        })
        .catch(err => {
          console.error('Error fetching wishlist:', err);

        });
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const handleRemoveFromWishlist = (id) => {
    fetch(`http://localhost:5000/api/wishlist/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.status === 204) {
          setWishlistItems((prev) => prev.filter((item) => item._id !== id));
        }
      })
      .catch(err => console.error('Error removing from wishlist:', err));
  };
  
  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Shortlisted Cars</h1>
      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">No cars in your wishlist.</div>
      ) : (
        <div className="wishlist-list">
          <div className="wishlist-grid">
            {wishlistItems.map((car) => (
              <div className="wishlist-card" key={car._id}>
                <Link to={`/car/${car.carId._id}`}>
                  <img
                    className="wishlist-img"
                    src={`http://localhost:5000${car.carId.images && car.carId.images.length > 0 ? car.carId.images[0] : ''}`}
                    alt={car.carId.name}
                  />
                </Link>
                <div className="wishlist-card-content">
                  <h2 className="wishlist-car-title">
                    <Link to={`/car/${car.carId._id}`}>{car.carId.brand}<br/>{car.carId.model}</Link>
                  </h2>
                  <div className="wishlist-details">
                    <div>Fuel Type: {car.carId.fuelType}</div>
                    <div>Transmission: {car.carId.transmission}</div>
                  </div>
                  <div className="wishlist-price">₹{car.carId.price.toLocaleString('en-IN')}</div>
                  <div className="wishlist-actions">
                    <div className="wishlist-action">
                      <button onClick={() => handleRemoveFromWishlist(car._id)}>Remove</button>
                    </div>
                    <div className="wishlist-action">
                      <Link to={`/car/${car.carId._id}`}>
                        <button>Book Now</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;