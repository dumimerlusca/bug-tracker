const User = require('../models/User');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/errorResponse');
const Token = require('../models/Token');
const jwt = require('jsonwebtoken')



// @desc   Register user
// @route  POST /api/v1/auth/register
// @acces  Public
exports.register = async (req, res, next) => {
  try {
    // Hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10)

    const user = await User.create(req.body)

    res.status(201).json({ succes: true })
  } catch (error) {
    next(error)
  }
}


// @desc   Login user
// @route  POST /api/v1/auth/login
// @acces  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate credentials
    if (!email || !password) {
      return next(new ErrorResponse('Please enter email and password', 400))
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 400))
    }

    // Check password
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return next(new ErrorResponse('Invalid credentials', 400))
    }

    const userPayload = {
      id: user.id,
      role: user.role,
      email: user.email
    }

    // Generate access token
    const token = generateAccessToken(userPayload);


    // Generate refresh token
    const refreshToken = jwt.sign(userPayload, process.env.JWT_REFRESH_SECRET);

    // Store refresh token in database
    await Token.create({ token: refreshToken });

    res.status(201)
      .json({ succes: true, accessToken: token, refreshToken: refreshToken })
  } catch (error) {
    next(error)
  }
}

// @desc   Refresh token
// @route  POST /api/v1/auth/refresh
// @acces  Private
exports.refresh = async (req, res, next) => {
  if (!req.body.token) {
    return next(new ErrorResponse('Please send a token', 400))
  }

  // Check to see if refresh token exists in database
  const token = await Token.findOne({ token: req.body.token });
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route, token not valid', 403))
  }
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_REFRESH_SECRET)
    const { id, role, email } = decoded
    console.log(decoded);
    const newToken = generateAccessToken({ id, role, email })

    res.status(200).json({ success: true, accessToken: newToken })

  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 403))
  }
}


// @desc   Logout user
// @route  POST /api/v1/auth/logout
// @acces  Private
exports.logout = async (req, res, next) => {
  let refreshToken;

  if (req.body.refreshToken) {
    refreshToken = req.body.refreshToken;
  } else {
    refreshToken = req.headers.cookie.split('=')[1];
  }
  // Check if refresh token exist
  if (!refreshToken) {
    res.status(200).json({ succes: true, msg: "Logout, no token" });
  }

  // Find and remove the token from the active tokens database
  try {
    await Token.findOneAndRemove({ token: refreshToken })
    res.status(200).json({ succes: true, msg: "Logout" })
  } catch (error) {
    res.status(200).json({ succes: true, msg: "Logout, no token" })
  }
}

// Generate Access token
function generateAccessToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15s' })
  return token;
}