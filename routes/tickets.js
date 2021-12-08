const express = require('express');
const {
  getTickets,
  getTicket,
  addTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/tickets')
const { protect, authorize, } = require('../middleware/auth')

const router = express.Router({ mergeParams: true });


// Re-route to other resource router
const commentsRouter = require('./comments');
router.use('/:id/comments', commentsRouter)

router.route('/')
  .get(protect, getTickets)
  .post(protect, addTicket)

router.route('/:id')
  .get(getTicket)
  .put(protect, authorize(['developer', 'admin', 'project manager', 'submitter']), updateTicket)
  .delete(protect, authorize(['project manager', 'admin', 'developer', 'submitter']), deleteTicket)

module.exports = router;