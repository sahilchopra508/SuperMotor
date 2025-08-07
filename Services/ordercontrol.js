const Order = require('../Models/orders');
const Car = require('../Models/car');

async function createOrder(data) {
  const car = await Car.findById(data.carId);
  if (!car) throw new Error('Car not found');
  if (car.status !== 'booked') throw new Error('Car must be booked before placing an order');

  const order = new Order(data);
  await order.save();

  await Car.findByIdAndUpdate(data.carId, { status: 'sold' });

  return order;
}

async function getAllOrders() {
  return await Order.find().populate('carId buyerId');
}

async function getOrderById(id) {
  const order = await Order.findById(id).populate('carId buyerId');
  if (!order) throw new Error('Order not found');
  return order;
}

async function deleteOrder(id) {
  const deleted = await Order.findByIdAndDelete(id);
  if (!deleted) throw new Error('Order not found');
  return { success: true };
}

async function getOrdersByUser(userId) {
  return await Order.find({ buyerId: userId }).populate('carId buyerId');
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  getOrdersByUser
};
