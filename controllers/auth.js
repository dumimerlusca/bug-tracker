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
    const userPayload = {
      id: user.id
    }

    // Generate access token
    const accessToken = generateAccessToken(userPayload);

    // Generate refresh token
    const refreshToken = jwt.sign(userPayload, process.env.JWT_REFRESH_SECRET);
    console.log('refreshToken:', refreshToken)
    // Store refresh token in database
    await Token.create({ refreshToken, user: user.id });

    res.status(201)
      .cookie('refreshToken', refreshToken)
      .json({ success: true, accessToken })
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
      id: user.id
    }

    // Generate access token
    const accessToken = generateAccessToken(userPayload);


    // Generate new refresh token
    const refreshToken = jwt.sign(userPayload, process.env.JWT_REFRESH_SECRET);

    // Update the refresh token in database or create a new one
    try {
      const tokenDB = await Token.findOneAndUpdate({ user: user.id }, { refreshToken })
      if (!tokenDB) {
        await Token.create({ user: user.id, refreshToken })
      }
    } catch (error) {
      next(error)
    }


    res.status(201)
      .cookie('refreshToken', refreshToken)
      .json({ success: true, accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
}

// @desc   Refresh token
// @route  POST /api/v1/auth/refresh
// @acces  Private
exports.refresh = async (req, res, next) => {
  if (!req.cookies.refreshToken) {
    return next(new ErrorResponse('Please send a token', 400))
  }

  // Check to see if refresh token exists in database
  const token = await Token.findOne({ refreshToken: req.cookies.refreshToken });
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route, token not valid', 401))
  }
  try {
    const decoded = jwt.verify(req.cookies.refreshToken, process.env.JWT_REFRESH_SECRET)
    const userPayload = {
      id: decoded.id
    }
    const newToken = generateAccessToken(userPayload)

    res.status(200).json({ success: true, accessToken: newToken })

  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
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
    refreshToken = req.cookies.refreshToken;
  }
  console.log(req.cookies)
  // Check if refresh token exist
  if (!refreshToken) {
    res.status(200).json({ success: true, msg: "Logout, no token" });
  }

  // Remove token from cookies


  // Find and remove the token from the active tokens database
  try {
    await Token.findOneAndRemove({ token: refreshToken })
    res.status(200).json({ success: true, msg: "Logout" })
  } catch (error) {
    res.status(200).json({ success: true, msg: "Logout, no token" })
  }
}

// @desc   Get current logged in user
// @route  POST /api/v1/auth/me
// @acces  Private
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return next(new ErrorResponse('Access denied', 401))
    }

    res.status(200).json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}


// Generate Access token
const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
  return token;
}

exports = { generateAccessToken }
