const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const authController = require('../../controllers/auth');

// @route    GET /auth
// @desc     Get user
// @access   Public
router.get('/', auth, authController.getUser);

// @route    POST /auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], authController.authenticateUser);

module.exports = router;