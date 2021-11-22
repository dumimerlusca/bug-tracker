const mongoose = require('mongoose');
const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');

// @desc   Get all projects
// @route  GET /api/v1/projects
// @acces  Public
exports.getProjects = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query }

    // Fields to exclude
    const removeFields = ['select', 'sort', 'limit', 'page'];
    removeFields.forEach(field => {
      delete reqQuery[field]
    })

    // Format the query
    const queryStr = JSON.stringify(reqQuery).replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    // Finding resource
    query = Project.find(JSON.parse(queryStr)).populate('tickets');

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
      succes: true,
      count: projects.length,
      total: total,
      page,
      data: projects
    })

  } catch (error) {
    next(error)
  }
}

// @desc   Get single projects
// @route  GET /api/v1/projects/:id
// @acces  Public
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new ErrorResponse(`Project with id ${req.params.id} not found`, 404))
    }

    res.status(200).json({ succes: true, data: project })
  } catch (error) {
    next(error)
  }
}

// @desc   Add project
// @route  POST /api/v1/projects
// @acces  Private
exports.addProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body)

    res.status(200).json({ succes: true, data: project })
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

    res.status(200).json({ succes: true, data: project })
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

    res.status(200).json({ succes: true, data: {} })
  } catch (error) {
    next(error)
  }
}