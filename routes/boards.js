const express = require('express');
const {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} = require('../controllers/boards');

const router = express.Router();

router.get('/', getBoards);
router.post('/', addBoard);
router.get('/:id', getBoard);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);

module.exports = router;
