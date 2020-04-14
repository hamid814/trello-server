const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Card = require('../models/Card');

// @route      GET /api/cards/:id
// @desc       get a single card
// @acces      Private
exports.getCard = asyncHandler(async (req, res, next) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    return next(new ErrorResponse(404, 'card not found'));
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
  req.body.board = req.body.boardId;
  req.body.list = req.body.listId;

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
  const cards = await Card.updateMany(req.body.find, req.body.update);

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

  await card.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
