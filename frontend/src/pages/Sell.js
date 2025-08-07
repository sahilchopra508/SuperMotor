import React, { useState, useEffect } from 'react';
import './Sell.css';

const Sell = ({user}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    brand: '',
    model: '',
    year: '',
    transmission: '',
    registration: '',
    date: '',
    time: ''
  });
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    if (!user) {
      setMessage('Please login to book an inspection.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }
    fetchInspections();
  }, [user]);

  const fetchInspections = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:5000/api/sell?userId=${user._id}`); 
      const data = await response.json();
      if (response.ok) {
        setInspections(data);
      }
    } catch (error) {
      console.error('Error fetching inspections:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          userId: user._id
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(
          <b>Your Car Inspection has been Booked for {form.date} at {form.time}.</b>
        );
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3500);
        setForm({
          name: '',
          email: '',
          phone: '',
          address: '',
          brand: '',
          model: '',
          year: '',
          transmission: '',
          registration: '',
          date: '',
          time: ''
        });
        fetchInspections(); 
      } else {
        setMessage(<b style={{ color: 'red' }}>Failed to book inspection. Please try again.</b>);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3500);
      }
    } catch (error) {
      setMessage(<b style={{ color: 'red' }}>Failed to book inspection. Please try again.</b>);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3500);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sell/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage(<b>Inspection cancelled successfully.</b>);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3500);
        fetchInspections();
      } else {
        setMessage(<b style={{ color: 'red' }}>Failed to cancel inspection. Please try again.</b>);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3500);
      }
    } catch (error) {
      setMessage(<b style={{ color: 'red' }}>Failed to cancel inspection. Please try again.</b>);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3500);
    }
  };

  return (
    <div className="sell-flex-container">
      <div className="sell-container">
        {showMessage && (
          <div className="sell-messagebox">{message}</div>
        )}
        <h1 className="sell-title">Sell Your Car</h1>
        <h2 className="sell-subtitle">Book Inspection</h2>
        <form className="sell-form" onSubmit={handleSubmit}>
          <div className="sell-form-row">
            <input className="sell-input" type="text" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
            <input className="sell-input" type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="sell-form-row">
            <input className="sell-input" type="phone" placeholder="Mobile Number" name="phone" value={form.phone} onChange={handleChange} />
            <input className="sell-input" type="text" placeholder="Address" name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="sell-form-row">
            <input className="sell-input" type="text" placeholder="Brand Name" name="brand" value={form.brand} onChange={handleChange} />
            <input className="sell-input" type="text" placeholder="Car Model" name="model" value={form.model} onChange={handleChange} />
          </div>
          <div className="sell-form-row">
            <input className="sell-input" type="text" placeholder="Car Year" name="year" value={form.year} onChange={handleChange} />
            <select className="sell-select" name="transmission" value={form.transmission} onChange={handleChange} required>
              <option value="" disabled>Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="Torque Converter">Torque Converter</option>
              <option value="CVT">CVT</option>
              <option value="DCT">DCT</option>
              <option value="AMT">AMT</option>
              <option value="IMT">IMT (Intelligent Manual Transmission)</option>
            </select>
          </div>
          <div className="sell-form-row">
            <input className="sell-input" type="text" placeholder="Registration No." name="registration" value={form.registration} onChange={handleChange} />
            <input className="sell-input" type="date" name="date" value={form.date} onChange={handleChange} />
            <input className="sell-input" type="time" name="time" value={form.time} onChange={handleChange} />
          </div>
          <button className="sell-btn" type="submit">Book</button>
        </form>
      </div>
      <div className="sell-inspections-card">
        <h2> Your Booked Inspections</h2>
        {inspections.length === 0 ? (
          <p>No inspections booked yet.</p>
        ) : (
          <ul>
            {inspections.map((insp) => (
              <li key={insp._id} className="sell-inspection-item">
                <b>{new Date(insp.date).toLocaleDateString('en-IN')} at {new Date(`1970-01-01T${insp.time}`).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</b><br/>
                {insp.name} — {insp.brand} {insp.model}
                <button className="sell-cancel-btn" onClick={() => handleCancel(insp._id)}>Cancel</button>
              </li>
            ))}
          </ul>
          
        )}
      </div>
    </div>
  );
};
export default Sell;