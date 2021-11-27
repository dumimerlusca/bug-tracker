const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Token', TokenSchema);