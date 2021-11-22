const mongoose = require('mongoose');
const Ticket = require('./Ticket');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Reverse populate with tickets
ProjectSchema.virtual('tickets', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'project',
  justOne: false
})

// Cascade delete tickets when a project is deleted
ProjectSchema.pre('remove', async function (next) {
  console.log(this)
  await Ticket.deleteMany({ project: this._id });
  next();
})

module.exports = mongoose.model('Project', ProjectSchema);