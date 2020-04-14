const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getLists,
  getList,
  addList,
  updateList,
  deleteList,
  clearList,
} = require('../controllers/lists');

const router = express.Router({ mergeParams: true });

router.get('/', getLists);
router.post('/', addList);
router.get('/:id', getList);
router.put('/:id', updateList);
router.delete('/:id', deleteList);
router.delete('/:id/clear', clearList);

module.exports = router;
