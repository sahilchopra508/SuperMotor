const Sell = require('../Models/sell');

createSellRequest = async (req, res) => {
  try {
    const sellRequest = new Sell(req.body);
    await sellRequest.save();
    res.status(201).json({ message: 'Inspection booked successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book inspection', details: error.message });
  }
};


getAllSellRequests = async (req, res) => {
  try {
    const { userId } = req.query;
    let query = {};
    if (userId) query.userId = userId;
    const sellRequests = await Sell.find(query);
    res.status(200).json(sellRequests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sell requests', details: error.message });
  }
};


getSellRequestById = async (req, res) => {
  try {
    const sellRequest = await Sell.findById(req.params.id);
    if (!sellRequest) {
      return res.status(404).json({ error: 'Sell request not found' });
    }
    res.status(200).json(sellRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sell request', details: error.message });
  }
};


updateSellRequest = async (req, res) => {
  try {
    const updatedSell = await Sell.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSell) {
      return res.status(404).json({ error: 'Sell request not found' });
    }
    res.status(200).json({ message: 'Sell request updated successfully', updatedSell });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sell request', details: error.message });
  }
};


deleteSellRequest = async (req, res) => {
  try {
    const deletedSell = await Sell.findByIdAndDelete(req.params.id);
    if (!deletedSell) {
      return res.status(404).json({ error: 'Sell request not found' });
    }
    res.status(200).json({ message: 'Sell request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sell request', details: error.message });
  }
}; 
module.exports = {
  createSellRequest,
  getAllSellRequests,
  getSellRequestById,
  updateSellRequest,
  deleteSellRequest,
};
