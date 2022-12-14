const express = require('express');
const router = express.Router();
const registerController = require('./../../http/controller/auth/registerController')

router.get('/register', registerController.showForm)
router.post('/register', registerController.registerProccess)
router.get('/login', registerController.loginForm)


module.exports = router;