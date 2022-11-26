const http = require('http')
const express = require('express');
const app = express();


module.exports = class Application {
    constructor() {
        this.configServer();
    }

    configServer() {
        const server = http.createServer(app)

        app.get('/', (req, res) => {
            res.end('home page')
        })

        app.listen(3000, (err) => {
            if (err) console.log(err);
            console.log('server is runing on port 3000 ... ')
        })
    }
}