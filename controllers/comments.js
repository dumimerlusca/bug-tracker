const Comment = require('../models/Comment');
const ErrorResponse = require('../utils/errorResponse');
const Ticket = require('../models/Ticket');

// @desc   Get all comments/ Get all comments of specific ticket
// @route  GET /api/v1/comments
// @route  GET /api/v1/tickets/:id/comments
// @acces  Private
exports.getComments = async (req, res, next) => {
  try {
    let query;
    if (req.params.id) {
      query = Comment.find({ ticket: req.params.id })
    } else {
      query = Comment.find();
    }

    // Populate
    query = query.populate('user');

    const comments = await query;

    res.status(200).json({ success: true, data: comments })
  } catch (error) {
    next(error)
  }
}

// @desc   Add comment
// @route  POST /api/v1/tickets/:id/comments
// @acces  Private
exports.addComment = async (req, res, next) => {
  try {
    const ticketId = req.params.id;

    // Check if ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return next(new ErrorResponse(`Ticket with id ${ticketId} does not exist`, 404))
    }

    const comment = await Comment.create({ ...req.body, ticket: ticketId, user: req.user._id })

    res.status(200).json({ success: true, data: comment })
  } catch (error) {
    next(error)
  }
}
// @desc   Update comment
// @route  PUT /api/v1/tickets/:id
// @acces  Private
exports.updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    let comment;

    // Check if comment exists
    comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ErrorResponse(`Comment with id ${commentId} does not exist`, 404))
    }

    comment = await Comment.findByIdAndUpdate(commentId, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({ success: true, data: comment })
  } catch (error) {
    next(error)
  }
}

// @desc   Delete comment
// @route  DELETE /api/v1/tickets/:id
// @acces  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    let comment;

    // Check if comment exists
    comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ErrorResponse(`Comment with id ${commentId} does not exist`, 404))
    }

    comment.remove();

    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    next(error)
  }
}