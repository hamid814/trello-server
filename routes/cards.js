const express = require('express');
const {
  getCard,
  addCard,
  updateCard,
  deleteCard,
} = require('../controllers/cards');

const router = express.Router();

router.post('/', addCard);
router.get('/:id', getCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

module.exports = router;
