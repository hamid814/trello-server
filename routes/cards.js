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

router.post('/', addCard);
router.get('/:id', getCard);
router.put('/updatemany', updateManyCards);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

module.exports = router;
