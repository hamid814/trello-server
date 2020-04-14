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

// Cascade delete cards when a list as deleted
ListSchema.pre('remove', async function (next) {
  console.log(`deleting cards from list ${this.id}`);
  await this.model('Card').deleteMany({ list: this._id });

  next();
});

module.exports = mongoose.model('List', ListSchema);
