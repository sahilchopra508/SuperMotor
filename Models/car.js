const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  ownerCount: {
    type: Number,
    required: true
  },
  carType: {
    type: String
  },
  fuelType: {
    type: String
  },
  transmission: {
    type: String
  },
  kmsDriven: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  registrationNumber: {
    type: String,
    unique: true,
    required: true
  },
  insuranceValidTill: {
    type: Date
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'sold'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Car', carSchema);
