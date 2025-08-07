const express = require('express');
const router = express.Router();
const {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
  getAllWishlist
} = require('../Services/wishlistcontrol');

// Wishlist Routes
router.post('/', async (req, res) => {
  try {
    const wishlist = await addToWishlist(req.body);
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const wishlist = await getUserWishlist(req.params.userId);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const wishlist = await getAllWishlist();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const wishlistItem = await require('../Models/wishlist').findById(req.params.id).populate('carId userId');
    if (!wishlistItem) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }
    res.json(wishlistItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await removeFromWishlist(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;