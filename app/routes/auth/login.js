const express = require('express');
const render = express.Router()
const loginController = require('./../../http/controller/auth/loginController')

router.get('/login',loginController.sh)

module.exports = render