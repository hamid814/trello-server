const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getCard,
  addCard,
  updateCard,
  updateManyCards,
  deleteCard,
} = require('../controllers/cards');

const router = express.Router();

router.post('/', protect, addCard);
router.get('/:id', protect, getCard);
router.put('/updatemany', protect, updateManyCards);
router.put('/:id', protect, updateCard);
router.delete('/:id', protect, deleteCard);

module.exports = router;
