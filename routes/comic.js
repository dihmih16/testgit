var express = require('express');
var router = express.Router();
var comiccontroller =require('../controllers/comicController');
var check_login = require('../middleware/check_login');
// upload file:
var multer = require('multer'); // dùng upload file
var uploader =  multer({dest: './tmp'});

router.get('/comic',  comiccontroller.getList);
router.post('/comic',   comiccontroller.getList);

router.get('/addcomic',  comiccontroller.addComic);
router.post('/addcomic', uploader.single('image'), comiccontroller.addComic);

router.get('/comic/update/:idcomic', comiccontroller.editComic);
router.post('/comic/update/:idcomic', uploader.single('image'),comiccontroller.editComic);

router.get('/comic/delete/:idcomic', comiccontroller.deleteComic);

router.get('/details/:idcomic', comiccontroller.getDetailComic);

router.get('/readcomic/:idcomic', comiccontroller.readComic);
module.exports = router;