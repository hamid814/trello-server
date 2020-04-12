const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Label = require('../models/Label');

// @desc      Get all labels for a user
// @route     GET /api/labels
// @access    Private
exports.getLabels = asyncHandler(async (req, res, next) => {
  const labels = await Label.find();

  res.status(200).json({
    success: true,
    count: labels.length,
    data: labels,
  });
});

// @desc        Get a single label
// @route       GET /api/label/:id
// @access      Private
exports.getLabel = asyncHandler(async (req, res, next) => {
  const label = await Label.findById(req.params.id);

  if (!label) {
    return next(new ErrorResponse(404, 'Label not found'));
  }

  res.status(200).json({
    success: true,
    data: label,
  });
});

// @desc        Add label
// @route       POST /api/labels
// @access      private
exports.addLabel = asyncHandler(async (req, res, next) => {
  const label = await Label.create(req.body);

  res.status(201).json({
    success: true,
    data: label,
  });
});

// @desc       Update a label
// @route      PUT /api/label/:id
// @access     private
exports.updateLabel = asyncHandler(async (req, res, next) => {
  let label = await Label.findById(req.params.id);

  if (!label) {
    return next(new ErrorResponse(404, "label doesn't exist"));
  }

  label = await Label.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: label,
  });
});

// @desc      Delete a label
// @route     DELETE /api/label/:id
// @access    Private
exports.deleteLabel = asyncHandler(async (req, res, next) => {
  const label = await Label.findById(req.params.id);

  if (!label) {
    return next(new ErrorResponse(404, "label doesn't exist"));
  }

  await label.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
