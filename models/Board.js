const mongoose = require('mongoose');
const List = require('./List');

const BoardSchema = new mongoose.Schema(
  {
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// reverse populate with virtuals
BoardSchema.virtual('lists', {
  ref: 'List',
  localField: '_id',
  foreignField: 'board',
  justOne: false,
});

// Cascade delete cards when a board is deleted
BoardSchema.pre('remove', async function (next) {
  console.log(`Cards being removed from board ${this._id}`);
  await this.model('Card').deleteMany({ board: this._id });

  next();
});

// Cascade delete lists when a board is deleted
BoardSchema.pre('remove', async function (next) {
  console.log(`Lists being removed from board ${this._id}`);
  await List.deleteMany({ board: this._id });

  next();
});

module.exports = mongoose.model('Board', BoardSchema);
