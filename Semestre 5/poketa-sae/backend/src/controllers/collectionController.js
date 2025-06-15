const collectionService = require('../services/collectionService');

const getUserCollection = async (req, res) => {
    try {
        const userId = req.user._id;
        const collection = await collectionService.getUserCollection(userId);
        res.status(200).json({ success: true, data: collection });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const addCardToCollection = async (req, res) => {
  try {
      const userId = req.user._id;
      const { card } = req.body;

      if (!card || !card.name || !card.type || !card.extension || !card.bloc) {
        return res.status(400).json({ success: false, message: "Card information is incomplete." });
      }

      const updatedCollection = await collectionService.addCardToCollection(userId, card);
      res.status(200).json({ success: true, data: updatedCollection });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
};

const updateCardQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { posId } = req.params;
        const { quantity } = req.body;
        const updatedCollection = await collectionService.updateCardQuantity(userId, parseInt(posId, 10), quantity);
        res.status(200).json({ success: true, data: updatedCollection });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteCardFromCollection = async (req, res) => {
    try {
        const userId = req.user._id;
        const { posId } = req.params;
        await collectionService.deleteCardFromCollection(userId, parseInt(posId, 10));
        res.status(200).json({ success: true, message: 'Card deleted from collection.' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    getUserCollection,
    addCardToCollection,
    updateCardQuantity,
    deleteCardFromCollection,
};