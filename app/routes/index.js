const express = require('express')
const router = express.Router()

 
const homeRoutes = require('./home')
const authRoutes = require('./auth')



// middleWare 
const redirectAuthenticated = require('app/http/middleware/redirectAuthenticated')

router.use('/', homeRoutes)
router.use('/auth', redirectAuthenticated.handle, authRoutes)

module.exports = router