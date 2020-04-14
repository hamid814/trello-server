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

router.route('/').get(getLabels).post(addLabel);

router.route('/:id').get(getLabel).put(updateLabel).delete(deleteLabel);

module.exports = router;
