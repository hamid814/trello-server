const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Board = require('./models/Board');
const List = require('./models/List');
const Card = require('./models/Card');
const Label = require('./models/Label');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read fade database files
// const todos = require('./db/todos');

// Import into DB
const importData = async () => {
  try {
    // await Todo.create(todos);
    // await User.create(users);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Board.deleteMany();
    await List.deleteMany();
    await Card.deleteMany();
    await Label.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete users
const deleteUsers = async () => {
  try {
    await User.deleteMany();
    console.log('users Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else if (process.argv[2] === '-dusers') {
  deleteUsers();
}
