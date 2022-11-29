const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();


module.exports = class Application {
    constructor() {
        this.configServer();
        this.setConfig();
        this.setRoutes()
    }

    configServer() {
        app.listen(3000, (err) => {
            if (err) console.log(err);
            console.log('server is runing on port 3000 ... ')
        })
    }

    setConfig() {
        app.use(express.static(__dirname + '/public'))
        app.use(expressLayouts);
        app.set('view engine', 'ejs')
        app.set('views', path.join(__dirname, 'resource/views'));
        app.set('layout' , 'master')
        app.set('layout extractScripts' , true)
        app.set('layout extractstyles' , true)
    }

    setRoutes() {
        app.get('/', (req, res) => {
            res.render('index')
        })
    }
}