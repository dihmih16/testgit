var express = require('express');
var router = express.Router();
var accountcontroller = require('../controllers/account.controller');
var check_login = require('../middleware/check_login');
const { get } = require('mongoose');


router.get('/login', accountcontroller.Login);
router.post('/login',  accountcontroller.Login);

// router.get('/logout',accountcontroller.Login);


router.get('/reg', accountcontroller.Reg);
router.post('/reg', accountcontroller.Reg);

router.get('/account',accountcontroller.getUsers);
router.post('/account',  accountcontroller.getUsers);

router.get('/logout', accountcontroller.Logout);

router.get('/add', accountcontroller.addAccount);
router.post('/add',  accountcontroller.addAccount);

router.get('/account/update/:iduser',accountcontroller.editAccount);
router.post('/account/update/:iduser',accountcontroller.editAccount);

router.get('/remove/:iduser', accountcontroller.deleteAccount);

module.exports = router;
