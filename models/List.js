const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please add name to board'],
  },
  watching: {
    type: Boolean,
    default: false,
  },
  board: {
    type: mongoose.Schema.ObjectId,
    ref: 'Board',
    required: [true, 'list must be bounded with a board'],
  },
  boardId: String,
});

module.exports = mongoose.model('List', ListSchema);
