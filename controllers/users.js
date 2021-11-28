const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


// @desc   Get all users in database
// @route  GET /api/v1/users
// @acces  Private
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    next(error)
  }
}

// @desc   Update user
// @route  PUT /api/v1/users/:id
// @acces  Private
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    res.status(201).json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}