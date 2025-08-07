const express = require('express');
const router = express.Router();
const { createSellRequest, getAllSellRequests, getSellRequestById, updateSellRequest, deleteSellRequest } = require('../Services/sellcontrol');

router.post('/sell', createSellRequest);
router.get('/sell', getAllSellRequests);
router.get('/sell/:id', getSellRequestById);
router.put('/sell/:id', updateSellRequest);
router.delete('/sell/:id', deleteSellRequest);

module.exports = router; 