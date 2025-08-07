const Auth = require('../Models/authentication');
const User = require('../Models/users');

async function registerUser(data) {
  const existing = await Auth.findOne({ email: data.email });
  if (existing) throw new Error('User already exists');

  const user = new Auth(data);  
  await user.save();

  const userData = {
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
  };
  const userDoc = new User(userData);
  await userDoc.save();

  return user;
}

async function loginUser(email, password) {
  const user = await Auth.findOne({ email });
  if (!user) throw new Error('User not found');

  if (user.password !== password) throw new Error('Invalid credentials');
  return user;
}

module.exports = { registerUser, loginUser };
