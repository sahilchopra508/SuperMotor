const mongoose = require('mongoose');
const User = require('../Models/users'); 

async function createUser(data) {
  const user = new User(data);
  await user.save();
  console.log("User created:", user);
  return user;
}

async function getAllUsers() {
  const users = await User.find();
  console.log("All Users:", users);
  return users;
}

async function getUserById(id) {
  const user = await User.findById(id);
  console.log("User:", user);
  return user;
}

async function updateUser(id, updateData) {
  const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  console.log("Updated User:", user);
  return user;
}

async function deleteUser(id) {
  await User.findByIdAndDelete(id);
  console.log("User deleted:", id);
  return id;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
