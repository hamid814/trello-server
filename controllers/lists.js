const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Board = require('../models/Board');
const List = require('../models/List');
const Card = require('../models/Card');

// @route      GET /api/boards/:boardId/lists
// @route      GET /api/lists  ( this route returns error )
// @desc       get all lists for a board
// @acces      Private
exports.getLists = asyncHandler(async (req, res, next) => {
  // check for route => /api/lists is wrong
  if (!req.params.boardId) {
    return next(new ErrorResponse(400, 'you must add a board id'));
  }

  // check if board exists
  const board = await Board.exists({
    _id: req.params.boardId,
    user: req.user._id,
  });

  if (!board) {
    return next(new ErrorResponse(404, 'board not found'));
  }

  const lists = await List.find({ board: req.params.boardId }).populate(
    'board'
  );

  res.status(200).json({
    success: true,
    count: lists.length,
    data: lists,
  });
});

// @route      GET /api/lists/:id
// @desc       get a single list
// @acces      Private
exports.getList = asyncHandler(async (req, res, next) => {
  const list = await List.findById(req.params.id).populate({
    path: 'board',
    select: 'title',
  });

  if (!list) {
    return next(new ErrorResponse(404, 'list not found'));
  }

  if (String(list.user) !== String(req.user._id)) {
    return next(new ErrorResponse(401, 'not Allowed'));
  }

  list.boardId = list.board._id;

  res.status(200).json({
    success: true,
    data: list,
  });
});

// @route      POST /api/boards/:boardId/lists
// @route      POST /api/lists ( this route returns error )
// @desc       add a list to a board
// @acces      Private
exports.addList = asyncHandler(async (req, res, next) => {
  if (!req.params.boardId) {
    return next(new ErrorResponse(400, 'you must add a board id'));
  }

  req.body.board = req.params.boardId;
  req.body.user = req.user._id;

  const list = await List.create(req.body);

  list.items = [];

  res.status(201).json({
    success: true,
    data: list,
  });
});

// @route      PUT /api/list/:id
// @desc       update a list
// @acces      Private
exports.updateList = asyncHandler(async (req, res, next) => {
  let list = await List.findById(req.params.id);

  if (!list) {
    return next(new ErrorResponse(404, 'list not found'));
  }

  if (String(req.user._id) !== String(list.user)) {
    return next(new ErrorResponse(401, 'Not Allowed'));
  }

  list = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: list,
  });
});

// @route      DELETE /api/list/:id/clear
// @desc       delete all cards in a list
// @acces      Private
exports.clearList = asyncHandler(async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (String(req.user._id) !== String(list.user)) {
    return next(new ErrorResponse(401, 'Not Allowed'));
  }

  await Card.deleteMany({ list: req.params.id });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @route      DELETE /api/list/:id
// @desc       delete a list
// @acces      Private
exports.deleteList = asyncHandler(async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    return next(new ErrorResponse(404, 'list not found'));
  }

  if (String(req.user._id) !== String(list.user)) {
    return next(new ErrorResponse(401, 'Not Allowed'));
  }

  await list.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
