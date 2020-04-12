const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @route      POST /api/auth/register
// @desc       register a user
// @acces      Public
exports.register = asyncHandler(async (req, res, next) => {
  res.send('register a user');
});

// @route      POST /api/auth/login
// @desc       login a user
// @acces      Public
exports.login = asyncHandler(async (req, res, next) => {
  res.send('login a user');
});

// @route      GET /api/auth/logout
// @desc       logout a user
// @acces      Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.send('loog the user out');
});

// @route      GET /api/auth/me
// @desc       get the logged in user
// @acces      Private
exports.getMe = asyncHandler(async (req, res, next) => {
  res.send('get the logged in user');
});

// test for github Bot ( telegram )
