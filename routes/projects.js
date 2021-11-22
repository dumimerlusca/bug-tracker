const express = require('express');
const {
  getProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects');
const Project = require('../models/Project');

const router = express.Router();

// Re-route to other resource router
const ticketsRouter = require('./tickets');
router.use('/:id/tickets', ticketsRouter)

router.route('/')
  .get(getProjects)
  .post(addProject)

router.route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject)


module.exports = router;