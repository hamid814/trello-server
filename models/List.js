const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'please add title for list'],
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ListSchema.virtual('items', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'list',
  justOne: false,
});

module.exports = mongoose.model('List', ListSchema);
