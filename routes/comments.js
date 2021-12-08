const express = require('express');
const {
  protect,
  authorize
} = require('../middleware/auth')
const {
  getComments,
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/comments')


const router = express.Router({ mergeParams: true });

router.route('/')
  .get(protect, getComments)
  .post(protect, authorize(['admin', 'project-manager', 'developer', 'submitter']), addComment)

router.route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment)


module.exports = router;