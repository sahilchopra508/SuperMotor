import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CarDetails from './pages/CarDetails';
import Bookings from './pages/Bookings';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Cars from './pages/Cars';
import Account from './pages/Account';
import Sell from './pages/Sell';
import './Footer.css';

function AppContent({ user, handleLogin, handleLogout }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/car/:id" element={<CarDetails user={user} />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/bookings" element={<Bookings user={user} />} />
        <Route path="/wishlist" element={<Wishlist user={user} />} />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/account" element={<Account user={user} />} />
        <Route path="/sell" element={<Sell user={user} />} />
      </Routes>
      <footer className={`footer${isHome ? ' footer-transparent' : ''}`}>
        <div className="footer-content">
          <p>© 2025 SUPERMOTOR. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);
  return (
    <Router>
      <AppContent user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
    </Router>
  );
}

export default App;