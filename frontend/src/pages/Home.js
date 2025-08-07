import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="bg-video">
        <video
          className="home-bg-video"
          src="/F.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      {/* First Section */}
      <div className="home-section">
          <div className="home-grid">
            <div className="home-text">
              <h1>Your Trusted & Hassle Free Car Buying Partner</h1>
              <p>Get the best deals without the hassle of dealerships.</p>
              <p>Personalized service,better delivery, and affordable financing.</p>
              <Link to="/signup" className="primary-btn">
                Find Your Car
              </Link>
            </div>

            <div className="image">
              <img
                src="/x6.jpg"
                alt="Luxury Car"
              />
            </div>
          </div>
        </div>

      {/* Second Section */}
      <div className="home-section">
          <div className="home-grid">
            <div className="image">
              <img
                src="/LAM.jpg"
                alt="Luxury Car"
              />
            </div>
            <div className="home-text">
              <h1>Your Next Car, Just a Click Away</h1>
              <p>Drive Your Dream Car Without the Dream Price.</p>
              <p>Quality Pre-Owned Cars Just for You!</p>
            </div>
          </div>
        </div>

      {/* Third Section */}
        <div className="why-section">
          <h2 className="whytitle">Why Choose SUPERMOTOR</h2>
          <div className="why-grid">
            <div className="why-box">
              <h3>Expert Guidance</h3>
              <p>
                Our team of experts will help you find the perfect car that matches your needs and budget.
              </p>
            </div>
            <div className="why-box">
              <h3>Best Deals</h3>
              <p>
                Get access to exclusive deals and competitive pricing on our wide selection of vehicles.
              </p>
            </div>
            <div className="why-box">
              <h3>Easy Financing</h3>
              <p>
                Quick and hassle-free financing options tailored to your requirements.
              </p>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Home;
