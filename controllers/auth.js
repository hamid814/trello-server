const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @route      POST /api/auth/register
// @desc       register a user
// @acces      Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  sendTokenResponse(res, 200, user);
});

// @route      POST /api/auth/login
// @desc       login a user
// @acces      Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new ErrorResponse(400, 'Please Enter an Email'));
  }

  if (!password) {
    return next(new ErrorResponse(400, 'Please Enter a Password'));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse(404, 'Invalid credentials'));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(404, 'Invalid credentials'));
  }

  sendTokenResponse(res, 200, user);
});

// @route      GET /api/auth/logout
// @desc       logout a user
// @acces      Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @route      GET /api/auth/me
// @desc       get the logged in user
// @acces      Private
exports.getMe = asyncHandler(async (req, res, next) => {
  console.log(req.user);

  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (res, statusCode, user) => {
  // Create Token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
