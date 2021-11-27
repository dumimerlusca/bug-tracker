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

router.route('/')
  .get(protect, getTickets)
  .post(protect, authorize(['admin', 'submitter', 'project manager']), addTicket)

router.route('/:id')
  .get(getTicket)
  .put(protect, authorize(['developer', 'admin', 'project manager']), updateTicket)
  .delete(protect, authorize(['project manager', 'admin']), deleteTicket)

module.exports = router;