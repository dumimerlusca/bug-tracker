const express = require('express');
const {
  getTickets,
  getTicket,
  addTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/tickets')

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getTickets)
  .post(addTicket)

router.route('/:id')
  .get(getTicket)
  .put(updateTicket)
  .delete(deleteTicket)

module.exports = router;