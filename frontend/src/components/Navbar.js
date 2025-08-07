import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const isAuthenticated = !!user;
  const [logoAnimate, setLogoAnimate] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerLogoAnimation = () => {
    setLogoAnimate(false);
    setTimeout(() => setLogoAnimate(true), 100);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };
  
  const handleProtectedClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setMessage('Please login first to access this feature.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <nav className={`nav${!isAuthenticated && isHome ? ' nav-transparent' : ''}${scrolled ? ' nav-blur' : ''}`}>
      {showMessage && <div className="message-box">{message}</div>}
      <div className="inner">
        <div className="logo-box">
          <Link to="/" onClick={triggerLogoAnimation}>
            <img
              key={logoAnimate ? 'logo-animate' : 'logo-static'}
              src="/S.png"
              alt="SuperMotor Logo"
              className={`logo${logoAnimate ? ' animate' : ''}`}
            />
          </Link>
        </div>
        <div className="links">
          {isAuthenticated ? (
            <>
              <Link className="link" to="/" onClick={triggerLogoAnimation}>Home</Link>
              <Link className="link" to="/cars" onClick={triggerLogoAnimation}>Buy</Link>
              <Link className="link" to="/sell" onClick={triggerLogoAnimation}>Sell</Link>
              <Link className="link" to="/bookings" onClick={triggerLogoAnimation}>My Bookings</Link>
              <Link className="link" to="/wishlist" onClick={triggerLogoAnimation}>Shortlisted</Link>
              <Link className="link" to="/orders" onClick={triggerLogoAnimation}>My Orders</Link>
              <Link className="link" to="/account" onClick={triggerLogoAnimation}>Account</Link>
              <button className="logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="link" to="/" onClick={triggerLogoAnimation}>Home</Link>
              <Link className="link" to="/cars" onClick={e => { handleProtectedClick(e); triggerLogoAnimation(); }}>Buy</Link>
              <Link className="link" to="/sell" onClick={e => { handleProtectedClick(e); triggerLogoAnimation(); }}>Sell</Link>
              <Link className="link" to="/login" onClick={triggerLogoAnimation}>Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
