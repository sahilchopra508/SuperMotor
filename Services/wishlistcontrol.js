const mongoose = require('mongoose');
const Wishlist = require('../Models/wishlist');

async function addToWishlist(data) {
  const entry = new Wishlist(data);
  await entry.save();
  console.log("Car added to wishlist:", entry);
  return entry;
}

async function getUserWishlist(userId) {
  const list = await Wishlist.find({ userId }).populate('carId');
  console.log("Wishlist for User:", list);
  return list;
}

async function removeFromWishlist(id) {
  const result = await Wishlist.findByIdAndDelete(id);
  console.log("Wishlist item removed:", id);
  return result;
}

async function getAllWishlist() {
  const list = await Wishlist.find().populate('carId userId');
  console.log("All wishlist entries:", list);
  return list;
}

module.exports = {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
  getAllWishlist
};
