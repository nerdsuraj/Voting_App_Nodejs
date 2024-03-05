const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const helper = require('../utillitis/helper'); 


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/fetch-user',helper.CheckToken, userController.fecthUser);




module.exports = router;