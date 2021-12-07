const mongoose = require('mongoose');
const Comment = require('./Comment');

const TicketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'high'
  },
  status: {
    type: String,
    enum: ['submitted', 'in progress', 'in review', 'done'],
    default: 'submitted'
  },
  type: {
    type: String,
    enum: ['bugs/errors'],
    default: 'bugs/errors'
  },
  submitter: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  developer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

TicketSchema.pre('remove', async function () {
  await Comment.deleteMany({ ticket: this._id })
})

module.exports = mongoose.model('Ticket', TicketSchema);