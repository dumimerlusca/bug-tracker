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

    // Generate token
    const token = await user.generateJwtTokenOnLogin();
    const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET);

    // Store refresh token in database
    await Token.create({ token: refreshToken });


    res.status(201)
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .json({ succes: true, token })
  } catch (error) {
    next(error)
  }
}

// @desc   Logout user
// @route  POST /api/v1/auth/logout
// @acces  Private
exports.logout = async (req, res, next) => {
  const refreshToken = req.headers.cookie.split('=')[1];
  console.log(refreshToken);
  try {
    await Token.findOneAndRemove({ token: refreshToken })
    res.status(200).json({ succes: true, msg: "Logout" })
  } catch (error) {
    res.status(200).json({ succes: true, msg: "Logout, no token" })
  }
}