const mongoose = require('mongoose')
const session = require('express-session')
const connectMongo = require('connect-mongo')


module.exports = {
    secret: 'secretKey',
    resave: true,
    saveUninitialized: true,
    store: connectMongo.create({ mongoUrl: 'mongodb://localhost:27017/nodeproject' }),
    cookie: { secure: false }
}