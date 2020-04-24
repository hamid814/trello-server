const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Card = require('../models/Card');
const Board = require('../models/Board');
const List = require('../models/List');

// @route      GET /api/cards/:id
// @desc       get a single card
// @acces      Private
exports.getCard = asyncHandler(async (req, res, next) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    return next(new ErrorResponse(404, 'card not found'));
  }

  if (String(card.user) !== String(req.user._id)) {
    return next(new ErrorResponse(404, 'not your card'));
  }

  res.status(200).json({
    success: true,
    data: card,
  });
});

// @route      POST /api/cards
// @desc       add a card to a list
// @acces      Private
exports.addCard = asyncHandler(async (req, res, next) => {
  const doesBoardExist = await Board.exists({
    _id: req.body.boardId,
    user: req.user._id,
  });

  if (!doesBoardExist) {
    return next(
      new ErrorResponse(404, "board doesn't exist or your not allowed")
    );
  }

  const doesListExist = await List.exists({
    _id: req.body.listId,
    user: req.user._id,
  });

  if (!doesListExist) {
    return next(
      new ErrorResponse(404, "list doesn't exist or your not allowed")
    );
  }

  req.body.board = req.body.boardId;
  req.body.list = req.body.listId;
  req.body.user = req.user._id;

  const card = await Card.create(req.body);

  card.id = card._id;

  res.status(201).json({
    success: true,
    data: card,
  });
});

// @route      PUT /api/cards/updatemany
// @desc       update a group of cards
// @acces      Private
exports.updateManyCards = asyncHandler(async (req, res, next) => {
  const cards = await Card.updateMany(
    { user: req.user._id, ...req.body.find },
    req.body.update
  );

  res.status(200).json({
    success: true,
  });
});

// @route      PUT /api/cards/:id
// @desc       update a card
// @acces      Private
exports.updateCard = asyncHandler(async (req, res, next) => {
  let card = await Card.findById(req.params.id);

  if (!card) {
    return next(new ErrorResponse(404, 'card not found'));
  }

  if (String(req.user._id) !== String(card.user)) {
    return next(new ErrorResponse(401, 'your not allowed to update this card'));
  }

  card = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  card.id = card._id;

  res.status(200).json({
    success: true,
    data: card,
  });
});

// @route      DELETE /api/Card/:id
// @desc       delete a card
// @acces      Private
exports.deleteCard = asyncHandler(async (req, res, next) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    return next(new ErrorResponse(404, 'card not found'));
  }

  if (String(req.user._id) !== card.user) {
    return next(new ErrorResponse(401, 'your not allowed to delete this card'));
  }

  await card.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
