const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
  deleteAllBoards,
} = require('../controllers/boards');

// Include other resource routers
const listsRouter = require('./lists');

const router = express.Router();

// Re-route into other resource routers
router.use('/:boardId/lists', listsRouter);

router.get('/', getBoards);
router.post('/', addBoard);
router.get('/:id', getBoard);
router.put('/:id', updateBoard);
router.delete('/all', deleteAllBoards);
router.delete('/:id', deleteBoard);

module.exports = router;
