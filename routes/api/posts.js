const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../../middleware/auth');
const postsController = require('../../controllers/posts');

// @route    POST /posts
// @desc     Create a post
// @access   Private
router.post('/', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], postsController.createPost);

// @route    GET /posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, postsController.getPosts);

// @route    GET /posts/:post_id
// @desc     Get post by id
// @access   Private
router.get('/:post_id', auth, postsController.getPost);

// @route    DELETE /posts/:post_id
// @desc     Delete a post by id
// @access   Private
router.delete('/:post_id', auth, postsController.deletePost);

// @route    PUT /posts/like/:post_id
// @desc     Like post
// @access   Private
router.put('/like/:post_id', auth, postsController.likePost);

// @route    PUT /posts/unlike/:post_id
// @desc     Unlike post
// @access   Private
router.put('/unlike/:post_id', auth, postsController.unlikePost);

// @route    POST /posts/comment/:post_id
// @desc     Comment on post
// @access   Private
router.post('/comment/:post_id', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], postsController.addComment);

// @route    DELTE /posts/comment/:post_id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:post_id/:comment_id', auth, postsController.deleteComment);

module.exports = router;