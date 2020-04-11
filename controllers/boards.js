const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Board = require('../models/Board');

// @route      GET /api/boards
// @desc       get all boards for a user
// @acces      Private
exports.getBoards = asyncHandler(async (req, res, next) => {
  const boards = await Board.find();

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
  const board = await Board.findById(req.params.id);

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

  res.status(201).json({
    success: true,
    data: board,
  });
});

// @route      PUT /api/boards/:id
// @desc       update a board
// @acces      Private
exports.updateBoard = asyncHandler(async (req, res, next) => {
  res.send('update board');
});

// @route      DELETE /api/boards/:id
// @desc       delete a board
// @acces      Private
exports.deleteBoard = asyncHandler(async (req, res, next) => {
  res.send('delete board');
});
