const mongoose = require('mongoose');
const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc   Get all projects
// @route  GET /api/v1/projects
// @acces  Public
exports.getProjects = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query }

    // Fields to exclude
    const removeFields = ['select', 'sort', 'limit', 'page', 'user'];
    removeFields.forEach(field => {
      delete reqQuery[field]
    })

    // Format the query
    const queryStr = JSON.stringify(reqQuery).replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    // Find only the project of specific user (project manager)
    if (req.query.user) {
      try {
        const user = await User.findById(req.query.user);
        if (!user) {
          return next(new ErrorResponse(`No user with id ${req.query.user}`, 404))
        }
        query = Project.find({ project_manager: req.query.user })
      } catch (error) {
        return next(error)
      }
    } else {
      // Finding all projects
      query = Project.find(JSON.parse(queryStr))
        .populate({
          path: 'tickets',
          model: 'Ticket',
          populate: [{
            path: 'createdBy',
            model: 'User'
          },
          {
            path: 'developers',
            model: 'User'
          }
          ]
        })
        .populate('developers')
        .populate('createdBy')
    }


    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    query = query.skip(startIndex).limit(limit);
    const total = await Project.countDocuments();

    const projects = await query;
    res.status(200).json({
      success: true,
      count: projects.length,
      total: total,
      page,
      data: projects
    })

  } catch (error) {
    next(error)
  }
}

// @desc   Get single project
// @route  GET /api/v1/projects/:id
// @acces  Public
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate({
        path: 'tickets',
        model: 'Ticket',
        populate: [{
          path: 'createdBy',
          model: 'User'
        },
        {
          path: 'developers',
          model: 'User'
        }
        ]
      })
      .populate('developers')
      .populate('createdBy')

    if (!project) {
      return next(new ErrorResponse(`Project with id ${req.params.id} not found`, 404))
    }

    res.status(200).json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}

// @desc   Add project
// @route  POST /api/v1/projects
// @acces  Private
exports.addProject = async (req, res, next) => {
  try {
    console.log('addproject')
    const project = await Project.create({ ...req.body, createdBy: req.user.id })

    res.status(200).json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}

// @desc   Update project
// @route  PUT /api/v1/project/:id
// @acces  Private
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!project) {
      return next(new ErrorResponse(`Project with id ${req.params.id} not found`, 404))
    }

    res.status(200).json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}

// @desc   Delete project
// @route  DELETE /api/v1/project/:id
// @acces  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return next(new ErrorResponse(`Project with id ${req.params.id} not found`, 404))
    }
    await project.remove()

    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    next(error)
  }
}