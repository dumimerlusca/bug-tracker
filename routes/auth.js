const express = require('express');
const {
  register,
  login,
  logout,
  refresh
} = require('../controllers/auth')
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/logout').post(protect, logout)

router.route('/refresh').post(refresh)

module.exports = router;