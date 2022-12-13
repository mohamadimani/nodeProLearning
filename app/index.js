const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
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
        app.use(express.static(__dirname + '/public'))
        app.use(expressLayouts);
        app.set('view engine', 'ejs')
        app.set('views', path.join(__dirname, 'resource/views'));
        app.set('layout', 'main')
        app.set('layout extractScripts', true)
        app.set('layout extractStyles', true)
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
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