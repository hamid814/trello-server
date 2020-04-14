const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
  color: {
    type: String,
    required: [true, 'please add a color for label'],
  },
  colorName: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Label', LabelSchema);
