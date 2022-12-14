const express = require('express');
const router = express.Router();
//controllers
const registerController = require('./../../http/controller/auth/registerController');

//validators
const registerValidator = require('./../../http/validator/registerValidator');

router.get('/register',  registerController.showForm);
router.post('/register', registerValidator.handle(), registerController.registerProccess);

router.get('/login', registerController.loginForm);


module.exports = router;