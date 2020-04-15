const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
// route files
const boards = require('./routes/boards');
const lists = require('./routes/lists');
const cards = require('./routes/cards');
const labels = require('./routes/labels');
const auth = require('./routes/auth');

// Init app
const app = express();

// load env vars
dotenv.config({ path: './config/config.env' });

// connect to DB
connectDB();

// body parser
app.use(express.json());

// log reqs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Add static files
app.use(express.static('public'));

// routes
app.use('/api/boards', boards);
app.use('/api/lists', lists);
app.use('/api/cards', cards);
app.use('/api/labels', labels);
app.use('/api/auth', auth);

// costum error handler
app.use(errorHandler);

const works = [
  'on label model pre remove => find cards with id of user to find faster',
];

if (process.env.NODE_ENV === 'development') {
  works.forEach((w) => console.log(w.magenta));
}

const PORT = process.env.PORT || 5000;

// Listen to port and log it
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.gray
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
