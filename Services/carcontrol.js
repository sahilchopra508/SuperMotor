const mongoose = require('mongoose');
const Car = require('../Models/car'); 

async function createCar(carData) {
  const car = new Car(carData);
  await car.save();
  console.log("Car added:", car);
}

async function getAllCars() {
  const cars = await Car.find();
  console.log("All Cars:", cars);
  return cars; 
}


async function filterCars(filters) {
  const query = {};

  if (filters.carType) query.carType = filters.carType;
  if (filters.brand) query.brand = filters.brand;
  if (filters.maxPrice) query.price = { $lte: filters.maxPrice };

  const cars = await Car.find(query);
  return cars; 
}


async function getCarById(id) {
  const car = await Car.findById(id);
  console.log(" Car:", car);
  return car; 
}

async function updateCar(id, updateData) {
  const car = await Car.findByIdAndUpdate(id, updateData, { new: true });
  console.log("Updated Car:", car);
  return car; // 
}

async function deleteCar(id) {
  await Car.findByIdAndDelete(id);
  console.log(" Car deleted:", id);
  return id; 
}

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  filterCars
};
