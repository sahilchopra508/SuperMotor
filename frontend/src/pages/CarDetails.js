import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CarDetails.css';

const CarDetails = ({ user }) => {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/cars/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch car details');
        return res.json();
      })
      .then(data => setCarData(data))
      .catch(err => {
        console.error('Error fetching car details:', err);
        setError(err.message);
      });
  }, [id]);

  const handleBookNow = async () => {
    if (!user) {
      setMessage('Please login to book this car.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }
    try {
      // 1. Create order on backend
      const res = await fetch('http://localhost:5000/api/payment/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 10000 }) 
      });
      const order = await res.json();
      if (!order.id) throw new Error('Failed to create payment order');

      // 2. Open Razorpay 
      const options = {
        key: 'rzp_test_4LwWCIW8kFEILO', 
        amount: order.amount,
        currency: order.currency,
        name: 'SuperMotor Car Booking',
        description: `${carData.brand} ${carData.model} Booking`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const bookingRes = await fetch('http://localhost:5000/api/bookings', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                carId: carData._id,
                buyerId: user._id,
                amountPaid: carData.price,
                paymentStatus: 'paid',
                status: 'confirmed',
                razorpayPaymentId: response.razorpay_payment_id
              })
            });
            if (bookingRes.ok) {
              setMessage('Your car has been booked!');
              setShowMessage(true);
              setTimeout(() => setShowMessage(false), 3000);
            } else {
              setMessage('Payment succeeded, but booking failed.');
              setShowMessage(true);
              setTimeout(() => setShowMessage(false), 3000);
            }
          } catch (err) {
            setMessage('Payment succeeded, but booking failed (network error).');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        theme: { color: '#0a2a66' }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setMessage('Payment initiation failed. Please try again.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, carId: carData._id })
      });
      if (res.ok) {
        setMessage(<b>Shortlisted</b>);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        setIsWishlisted(true);
      } else {
        setMessage('Failed to shortlist. Please try again.');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    } catch {
      setMessage('Network error.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  if (error) {
    return (
      <div className="container1">
        <div className="error1">Error: {error}</div>
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="container1">
        <div className="error1">Car not found</div>
      </div>
    );
  }

  return (
    <div className="container1">
      {showMessage && (
        <div className="message1">
          {message}
        </div>
      )}
      
      <div className="grid1">
        {/* All images */}
        <div className="gallery1">
          <img
            src={`http://localhost:5000${carData.images[selectedImage]}`}
            alt={carData.name}
            className="imgmain1"
          />
          <div className="select1">
            {carData.images?.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000${image}`}
                alt={`${carData.name} ${index + 1}`}
                className={`imgselect1${selectedImage === index ? ' selected' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
            <div className="about1">
              <div className="aboutus1">
                <h2 className="title2">Vehicle Inspection & Quality Assurance</h2>
              <ul>
                <li>
                  All vehicles are thoroughly inspected. The actual condition of each car—including any noticeable scratches, dents, or repairs—will be clearly detailed in the listing, along with recent photographs.
                </li>
                <li>
                  We ensure complete transparency: the features, mileage, and service history are provided so you can make an informed decision.
                </li>
                <li>
                  Vehicle descriptions are 100% honest and based on the current physical and mechanical condition. Our team highlights all relevant details, upgrades, and any known issues to avoid surprises at delivery.
                </li>
                <li>
                  This pre-owned car is in excellent, having passed our multi-point inspection. Exact condition details are available upon request.
                </li>
                <li>
                  The car's registered documents, insurance, and pollution certificates are up to date; all vehicles are sold with complete paperwork.
                </li>
                <li>
                  We list every vehicle exactly as it is. If you notice any discrepancy between your expectations and the actual car condition upon delivery, please contact us for resolution.
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Car Details */}
        <div className="info1">
          <h2 className="title1">
            {carData.brand}<br />{carData.model}
          </h2>
          <h2 className="price">₹{carData.price.toLocaleString('en-IN')}</h2><br />
          <div className="section1">
            <div><b>Year:</b> {carData.year}</div>
            <div><b>Kilometers Driven:</b> {carData.kmsDriven} km</div>
            <div><b>Fuel Type:</b> {carData.fuelType}</div>
            <div><b>Transmission:</b> {carData.transmission}</div>
            <div><b>No. of Owner(s):</b> {carData.ownerCount}</div>
            <div><b>Registration:</b> {carData.registrationNumber}</div>
            <div><b>Car Type:</b> {carData.carType}</div>
            <div><b>Location:</b> {carData.location}</div>
            <div><b>Insurance Valid Till:</b> 
              {carData.insuranceValidTill
                ? new Date(carData.insuranceValidTill).toLocaleDateString()
                : 'N/A'}
            </div>
            <div><b>Status:</b> {carData.status}</div>
            <div><b>Car Condition:</b> Good</div>
          </div>
          <p className="description1">{carData.description}</p>
          <h4 className="description2">Pay ₹10000 to Book Now</h4>
          <button className="book1" onClick={handleBookNow}>Book Now</button>
          <button
            className="shortlist1"
            onClick={handleAddToWishlist}
            disabled={isWishlisted}
          >
            {isWishlisted ? 'Shortlisted' : 'Shortlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
