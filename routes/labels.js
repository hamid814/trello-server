const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getLabels,
  getLabel,
  addLabel,
  updateLabel,
  deleteLabel,
} = require('../controllers/labels');

const router = express.Router();

router.route('/').get(protect, getLabels).post(protect, addLabel);

router
  .route('/:id')
  .get(protect, getLabel)
  .put(protect, updateLabel)
  .delete(protect, deleteLabel);

module.exports = router;
