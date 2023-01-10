const express = require('express');
const router = express.Router();
//controllers
const registerController = require('app/http/controller/auth/registerController');
const loginController = require('app/http/controller/auth/loginController');

//validators
const registerValidator = require('app/http/validator/registerValidator');
const loginValidator = require('app/http/validator/loginValidator');

router.get('/register', registerController.showForm);
router.post('/register', registerValidator.handle(), registerController.registerProccess);

router.get('/login', loginController.showForm);
router.post('/login', loginValidator.handle(), loginController.loginProccess);

router.get('/logout', loginController.logout);

// router.get('/google', loginController.googleLogin);
// router.get('/google/callback', loginController.googleCallback);


module.exports = router;