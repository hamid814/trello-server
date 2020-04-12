const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'please add text for card'],
  },
  watching: {
    type: Boolean,
    default: false,
  },
  desc: String,
  board: {
    type: mongoose.Schema.ObjectId,
    ref: 'Board',
    required: true,
  },
  list: {
    type: mongoose.Schema.ObjectId,
    ref: 'List',
    required: true,
  },
  listId: String,
  boardId: String,
});

module.exports = mongoose.model('Card', CardSchema);
