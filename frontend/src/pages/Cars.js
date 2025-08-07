import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import './Cars.css';

const Cars = () => {

  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    carType: '',
    priceRange: [0, 100000000]
  });
  const [price, setPrice] = useState({
    min: 0,
    max: 100000000
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cars');
        const data = await response.json();

        setCars(data);

        const prices = data.map(car => car.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        setPrice({ min: minPrice, max: maxPrice });
        setFilters(prev => ({
          ...prev,
          priceRange: [minPrice, maxPrice]
        }));
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const brands = [...new Set(cars.map(car => car.brand))].filter(Boolean);
  const carTypes = [...new Set(cars.map(car => car.carType))].filter(Boolean);

  const filteredCars = cars.filter(car => {
    const matchesBrand = !filters.brand || car.brand === filters.brand;
    const matchesType = !filters.carType || car.carType === filters.carType;
    const matchesPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
    return matchesBrand && matchesType && matchesPrice;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceRangeChange = (newRange) => {
    setFilters(prev => ({
      ...prev,
      priceRange: newRange
    }));
  };

  const formatPrice = (price) => {
    return Number.isFinite(price) ? price.toLocaleString() : '';
  };

  if (!cars.length) return null;
  return (
    <div className="container">
      
      <h1 className="title">All Cars</h1>
      <div className="main">
        
        {/* Filter Sidebar */}
        <div className="filter">
          <h2 className="filter-title">Filters</h2>

          {/* Brand Filter */}
          <div className="group">
            <label htmlFor="brand-select">Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="select">
              <option value="">All</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Car Type Filter */}
          <div className="group">
            <label htmlFor="type-select">Car Type</label>
            <select
              id="type-select"
              value={filters.carType}
              onChange={(e) => handleFilterChange('carType', e.target.value)}
              className="select">
              <option value="">All</option>
              {carTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="group price-range">
            <label>Price Range (₹)</label>
            <div className="range-labels">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
            <div className="range-inputs">
              <input
                type="range"
                min={price.min}
                max={price.max}
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange([Number(e.target.value), filters.priceRange[1]])}
                className="slider"
              />
              <input
                type="range"
                min={price.min}
                max={price.max}
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange([filters.priceRange[0], Number(e.target.value)])}
                className="slider"
              />
            </div>
          </div>
        </div>

        {/* Cars List */}
        <div className="list">
          <div className="list-grid">
            {filteredCars.map(car => (
              <Link to={`/car/${car._id}`} className="card" key={car._id} >
                <img
                  className="img"
                  src={`http://localhost:5000${car.images && car.images.length > 0 ? car.images[0] : ''}`}
                  alt={car.title}
                />
                <div className="content">
                  <h2 className="car-title">{car.brand}<br/>{car.model}</h2>
                  <div className="card-price">₹{car.price.toLocaleString('en-IN')}</div>
                  <div className="details">
                    <div><b>Year:</b> {car.year}</div>
                    <div><b>Transmission:</b> {car.transmission}</div>
                    <div><b>Fuel Type:</b> {car.fuelType}</div>
                    <div><b>No. of Owner(s):</b> {car.ownerCount}</div>
                    <div><b>Status:</b> {car.status}</div>
                    <div><b>Car Condition:</b> Good</div>
                  </div>
                 
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
