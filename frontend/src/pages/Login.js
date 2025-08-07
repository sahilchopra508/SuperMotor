import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        onLogin(data.user);
        setMessage(<b>Login successful!</b>);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        navigate('/cars');
      } else {
        setMessage('Login failed. Please check your credentials.');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    } catch (error) {
      setMessage('Login failed: ' + error.message);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className="login-container">
      {showMessage && (
        <div className="custom-message-box">{message}</div>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-title">Welcome Back</div>
        <div className="login-subtitle">
          Please Enter Your Details to Login
        </div>
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="login-btn" type="submit">Login</button>
        <div className="signup">
          Don't have an account?{' '}
          <button
            type="button"
            className="signup-btn secondary"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;