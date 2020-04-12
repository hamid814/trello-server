const express = require('express');
const {
  getLists,
  getList,
  addList,
  updateList,
  deleteList,
} = require('../controllers/lists');

const router = express.Router({ mergeParams: true });

router.get('/', getLists);
router.post('/', addList);
router.get('/:id', getList);
router.put('/:id', updateList);
router.delete('/:id', deleteList);

module.exports = router;
