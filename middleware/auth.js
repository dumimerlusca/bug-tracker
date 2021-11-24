const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new ErrorResponse('Not authorized to access this route', 403))
  }
  const token = authorization.split(' ')[1];

  // Validate token
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const { id, role } = decoded;

    req.user = { id, role }
  } catch (error) {

    return next(new ErrorResponse('Not authorized to access this route', 403))
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