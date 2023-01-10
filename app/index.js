const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const session = require('express-session')
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const passportLocal = require('passport-local')
const passport = require('passport'); 
const rememberLogin = require('./http/middleware/rememberLogin');
const app = express();


module.exports = class Application {
    constructor() {
        this.configServer();
        this.setConfig();
        this.setRoutes()
        this.configeDatabase()
    }

    configServer() {
        app.listen(3333, (err) => {
            if (err) console.log(err);
            console.log('server is runing on port 3333 ... ')
        })
    }

    setConfig() {
        require('./passport/passport-local')
        app.use(express.static(config.layout.PUBLIC_DIR))
        app.set('view engine', config.layout.VIEW_ENGIN)
        app.set('views', config.layout.VIEW_DIR);
        app.use(config.layout.EJS.expressLayouts);
        app.set('layout', config.layout.EJS.main)
        app.set('layout extractScripts', config.layout.EJS.extractStyle)
        app.set('layout extractStyles', config.layout.EJS.extractScript)
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({ ...config.session }))
        app.use(cookieParser('secretID'));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        mongoose.set('strictQuery', true)
        app.use(rememberLogin.handle)
    }

    setRoutes() {
        app.use(require('./routes'))
    }

    async configeDatabase() {
        // global.promise = mongoose.promise
        await mongoose.connect(config.database.url).then(() => console.log('Mongo DB Connected!'))
    }
}