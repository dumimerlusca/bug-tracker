const express = require('express');
const {
  register,
  login,
  logout,
  refresh,
  getCurrentUser
} = require('../controllers/auth')
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/logout').post(logout)

router.route('/refresh').post(refresh)

router.route('/me').post(protect, getCurrentUser)

module.exports = router;