const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/comment/:idcomic', commentController.getCommentsByComicId);
router.post('/comment', commentController.postComment);

module.exports = router;
