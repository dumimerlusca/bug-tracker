const express = require('express');
const {
  protect,
  authorize
} = require('../middleware/auth');
const {
  getUsers,
  updateUser
} = require('../controllers/users');

const router = express.Router();

router.route('/').get(protect, getUsers);
router.route('/:id').put(protect, updateUser);



module.exports = router