const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
  deleteAllBoards,
  clearBoard,
} = require('../controllers/boards');

// Include other resource routers
const listsRouter = require('./lists');

const router = express.Router();

// Re-route into other resource routers
router.use('/:boardId/lists', listsRouter);

router.get('/', protect, getBoards);
router.post('/', protect, addBoard);
router.get('/:id', protect, getBoard);
router.put('/:id', protect, updateBoard);
router.delete('/all', protect, deleteAllBoards);
router.delete('/:id/clear', protect, clearBoard);
router.delete('/:id', protect, deleteBoard);

module.exports = router;
