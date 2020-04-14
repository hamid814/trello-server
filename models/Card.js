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
  desc: {
    type: String,
    default: '',
  },
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
  labels: {
    type: [mongoose.Schema.ObjectId],
    default: [],
  },
  checklists: {
    type: Array,
    default: [],
  },
  listId: String,
  boardId: String,
});

module.exports = mongoose.model('Card', CardSchema);
