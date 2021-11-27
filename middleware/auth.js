const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const { generateAccessToken } = require('../controllers/auth');
const dotenv = require('dotenv');


exports.protect = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new ErrorResponse('Not authorized to access this route', 403))
  }
  const token = authorization.split(' ')[1];

  // Validate token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const { id } = decoded;

    req.user = { id }
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route, token not valid', 403))
  }

  next();
}

exports.authorize = (roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse('Not authorized to access this route', 403))
    }
    next();
  }
}

// Validate refresh token and sign a new access token
const validateRefreshToken = async (refreshToken, res, next) => {
  // Check if refresh token is in database
  try {
    const token = await Token.findOne({ refreshToken });
    if (!token) {
      return next(new ErrorResponse('No Refresh token', 403))
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const userPayload = {
      id: decoded.id
    }
    const accessToken = jwt.sign(userPayload, process.env.JWT_SECRET)
    console.log(accessToken);
    req.user.accessToken = accessToken;
    next();
  } catch (error) {
    return next(new ErrorResponse('Refresh token invalid asdad', 403))
  }
}