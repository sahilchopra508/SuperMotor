const mongoose = require('mongoose');
const Booking = require('../Models/book');
const Car = require('../Models/car');

async function createBooking(data) {
  const car = await Car.findById(data.carId);
  if (!car) throw new Error('Car not found');
  if (car.status === 'booked') throw new Error('This car is already booked');

  const booking = new Booking(data);
  await booking.save();

  car.status = 'booked';
  await car.save();

  return booking;
}

async function getAllBookings(filter = {}) {
  if (filter.buyerId) {
    return await Booking.find({ buyerId: filter.buyerId }).populate('carId buyerId');
  }
  return await Booking.find().populate('carId buyerId');
}

async function getBookingById(id) {
  const booking = await Booking.findById(id).populate('carId buyerId');
  if (!booking) throw new Error('Booking not found');
  return booking;
}

async function updateBooking(id, updateData) {
  const updated = await Booking.findByIdAndUpdate(id, updateData, { new: true });
  if (!updated) throw new Error('Booking not found');
  return updated;
}

async function deleteBooking(id) {
  const deleted = await Booking.findByIdAndDelete(id);
  if (!deleted) throw new Error('Booking not found');

}

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
};
