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
  .get(protect, authorize(['developer', 'admin']), getTickets)
  .post(protect, authorize(['developer', 'admin']), addTicket)

router.route('/:id')
  .get(getTicket)
  .put(protect, authorize(['developer', 'admin']), updateTicket)
  .delete(protect, authorize(['developer', 'admin']), deleteTicket)

module.exports = router;