const mongoose = require('mongoose');
const Card = require('./Card');

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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Cascade update cards when a label is deleted
LabelSchema.pre('remove', async function (next) {
  console.log(`removing label ${this._id} from cards`);
  const cards = await Card.updateMany(
    { labels: { $in: [this._id] } },
    {
      $pull: { labels: { $in: [this._id] } },
    },
    { multi: true }
  );
  console.log(this._id);
  next();
});

module.exports = mongoose.model('Label', LabelSchema);
