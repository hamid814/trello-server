const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please add name to board'],
  },
  color: {
    type: String,
    default: '#6c9',
  },
  starred: {
    type: Boolean,
    default: false,
  },
  watching: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    maxlength: 250,
  },
});

module.exports = mongoose.model('Board', BoardSchema);
