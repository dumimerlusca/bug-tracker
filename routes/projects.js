const express = require('express');
const {
  getProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects');
const { protect, authorize } = require('../middleware/auth')

const router = express.Router();

// Re-route to other resource router
const ticketsRouter = require('./tickets');
router.use('/:id/tickets', ticketsRouter)

router.route('/')
  .get(getProjects)
  .post(protect, authorize(['developer', 'admin']), addProject)

router.route('/:id')
  .get(getProject)
  .put(protect, authorize(['developer', 'admin']), updateProject)
  .delete(protect, authorize(['developer', 'admin']), deleteProject)


module.exports = router;