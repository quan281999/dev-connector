const express = require('express');
const router = express.Router();
const { check} = require('express-validator');

const auth = require('../../middleware/auth');
const usersController = require('../../controllers/users');

// @route    POST /users
// @desc     Register user
// @access   Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], usersController.createUser);

// @route    DELETE /users
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, usersController.deleteUser);

module.exports = router;