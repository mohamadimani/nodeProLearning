const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const session = require('express-session')
const connectMongo = require('connect-mongo')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const passportLocal = require('passport-local')
const passport = require('passport')
const app = express();


module.exports = class Application {
    constructor() {
        this.configServer();
        this.setConfig();
        this.setRoutes()
        this.configeDatabase()
    }

    configServer() {
        app.listen(3000, (err) => {
            if (err) console.log(err);
            console.log('server is runing on port 3000 ... ')
        })
    }

    setConfig() {
        require('./passport/passport-local')
        app.use(express.static(__dirname + '/public'))
        app.use(expressLayouts);
        app.set('view engine', 'ejs')
        app.set('views', path.join(__dirname, 'resource/views'));
        app.set('layout', 'main')
        app.set('layout extractScripts', true)
        app.set('layout extractStyles', true)
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({
            secret: 'secretKey',
            resave: true,
            saveUninitialized: true,
            store: connectMongo.create({ mongoUrl: 'mongodb://localhost:27017/nodeproject' }),
            cookie: { secure: false }
        }))
        app.use(cookieParser());
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        mongoose.set('strictQuery', true)
    }

    setRoutes() {
        app.use(require('./routes'))
    }

    async configeDatabase() {
        // global.promise = mongoose.promise
        await mongoose.connect('mongodb://localhost:27017/nodeproject', {
        }).then(() => console.log('Mongo DB Connected!'))
    }
}