const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { registerUser, loginUser } = require('../Services/authcontrol');

// Register Route with Validation
router.post('/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').isMobilePhone().withMessage('Valid phone number is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await registerUser(req.body);
      res.status(201).json({ message: 'User registered', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Login Route with Validation
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await loginUser(req.body.email, req.body.password);
      res.json({ message: 'Login successful', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

module.exports = router;
