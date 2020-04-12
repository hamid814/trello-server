const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getLists,
  getList,
  addList,
  updateList,
  deleteList,
} = require('../controllers/lists');

const router = express.Router({ mergeParams: true });

router.get('/', protect, getLists);
router.post('/', protect, addList);
router.get('/:id', protect, getList);
router.put('/:id', protect, updateList);
router.delete('/:id', protect, deleteList);

module.exports = router;
