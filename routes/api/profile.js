const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const profileController = require('../../controllers/profile');

// @route    GET /profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, profileController.getCurrentProfile);

// @route    POST /profile
// @desc     Create or update user profile
// @access   Private
router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]], profileController.createProfile);

// @route    GET /profile
// @desc     Get all profiles
// @access   Public
router.get('/', profileController.getProfiles);

// @route    GET /profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', profileController.getProfile);

// @route    PUT /profile/experience
// @desc     Add profile experience
// @access   Private
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], profileController.addExperience);

// @route    DELETE /profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:exp_id', auth, profileController.deleteExperience);

// @route    PUT /profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  profileController.addEducation
);

// @route    DELETE /profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', auth, profileController.deleteEducation);

// @route    GET /profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', profileController.getRepos);

module.exports = router;