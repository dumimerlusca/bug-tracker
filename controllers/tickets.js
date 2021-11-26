const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');

// @desc   Get all tickets
// @route  GET /api/v1/tickets
// @route  GET /api/v1/projects/:id/tickets
// @acces  Public
exports.getTickets = async (req, res, next) => {
  try {
    let query;

    if (req.params.id) {
      query = Ticket.find({ project: req.params.id })
    } else {
      query = Ticket.find().populate({
        path: 'project',
        select: 'name description'
      });
    }

    const tickets = await query;
    res.status(201).json({
      succes: true,
      count: tickets.length,
      data: tickets
    })
  } catch (error) {
    next(error)
  }
}

// @desc   Get single ticket
// @route  GET /api/v1/ticket/:id
// @acces  Public
exports.getTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return next(new ErrorResponse(`Ticket with id ${req.params.id} not found`, 404))
    }

    res.status(200).json({ succes: true, data: ticket })
  } catch (error) {
    next(error)
  }
}

// @desc   Add ticket
// @route  POST /api/v1/projects/:id/tickets
// @acces  Private
exports.addTicket = async (req, res, next) => {
  try {
    req.body.project = req.params.id;
    req.body.createdBy = req.user.id;

    const project = await Project.findById(req.body.project);
    if (!project) {
      return next(new ErrorResponse(`No project with the id ${req.params.id}`, 404))
    }

    const ticket = await Ticket.create(req.body);

    res.status(201).json({ succes: true, data: ticket })
  } catch (error) {
    next(error)
  }
}

// @desc   Update ticket
// @route  PUT /api/v1/ticket/:id
// @acces  Private
exports.updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!ticket) {
      return next(new ErrorResponse(`Ticket with id ${req.params.id} not found`, 404))
    }

    res.status(200).json({ succes: true, data: ticket })
  } catch (error) {
    next(error)
  }
}

// @desc   Delete ticket
// @route  DELETE /api/v1/ticket/:id
// @acces  Private
exports.deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByIdAndRemove(req.params.id)

    if (!ticket) {
      return next(new ErrorResponse(`Ticket with id ${req.params.id} not found`, 404))
    }

    res.status(200).json({ succes: true, data: {} })
  } catch (error) {
    next(error)
  }
}
