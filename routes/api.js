var express = require('express');
var router = express.Router();
var apiU = require('../controllers/api/api_users');
var apiCi = require('../controllers/api/api_comic');
var apiCT = require('../controllers/api/api_comment');

router.get('/users',apiU.listUsers);
router.post('/users/reg',apiU.regUsers);
router.post('/users/login',apiU.loginUser);
router.get('/users/:iduser',apiU.listUsers);
router.put('/users/:iduser',apiU.updateUser);
router.delete('/users/:iduser',apiU.deleteUser);

router.get('/comic',apiCi.listComic);
router.post('/comic',apiCi.addComic);
router.get('/comic/:id',apiCi.getComicDetail);
router.get('/comic/:idcomic/read',apiCi.readComic);
router.put('/comic/:idcomic',apiCi.UpdateComic);
router.delete('/comic/:idcomic',apiCi.deleteComic);

router.get('/comment',apiCT.listComment);
router.post('/comment',apiCT.addComment);
router.get('/comment/:idcomment',apiCT.listComment);
router.put('/comment/:idcomment',apiCT.UpdateComment);
router.delete('/comment/:idcomment',apiCT.deleteComment);

module.exports = router;