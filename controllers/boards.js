const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Board = require('../models/Board');
const List = require('../models/List');
const Card = require('../models/Card');

// @route      GET /api/boards
// @desc       get all boards for a user
// @acces      Private
exports.getBoards = asyncHandler(async (req, res, next) => {
  const boards = await Board.find().populate({
    path: 'lists',
    populate: {
      path: 'items',
    },
  });

  res.status(200).json({
    success: true,
    count: boards.length,
    data: boards,
  });
});

// @route      GET /api/boards/:id
// @desc       get a single board
// @acces      Private
exports.getBoard = asyncHandler(async (req, res, next) => {
  if (!req.params.id || req.params.id == 'null') {
    return next(new ErrorResponse(400, 'please a an id'));
  }

  const board = await Board.findById(req.params.id).populate({
    path: 'lists',
    populate: {
      path: 'items',
    },
  });

  if (!board) {
    return next(new ErrorResponse(404, 'board not found'));
  }

  res.status(200).json({
    success: true,
    data: board,
  });
});

// @route      POST /api/boards
// @desc       add a board
// @acces      Private
exports.addBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.create(req.body);

  board.lists = [];

  res.status(201).json({
    success: true,
    data: board,
  });
});

// @route      PUT /api/boards/:id
// @desc       update a board
// @acces      Private
exports.updateBoard = asyncHandler(async (req, res, next) => {
  let board = await Board.findById(req.params.id);

  if (!board) {
    return next(new ErrorResponse(404, 'board not found'));
  }

  board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: board,
  });
});

// @route      DELETE /api/boards/:id/clear
// @desc       clear lists and cards from a board
// @acces      Private
exports.clearBoard = asyncHandler(async (req, res, next) => {
  await List.deleteMany({ board: req.params.id });
  await Card.deleteMany({ board: req.params.id });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @route      DELETE /api/boards/:id
// @desc       delete a board
// @acces      Private
exports.deleteBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return next(new ErrorResponse(404, 'board not found'));
  }

  await board.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @route      DELETE /api/boards/all
// @desc       delete all boards for a user
// @acces      Private
exports.deleteAllBoards = asyncHandler(async (req, res, next) => {
  const boards = await Board.find();

  // cascade delete lists and card from boards
  boards.forEach(async (board) => {
    await List.deleteMany({ board: board._id });
    await Card.deleteMany({ board: board._id });
  });

  await Board.deleteMany();

  res.status(200).json({
    success: true,
    data: {},
  });
});
