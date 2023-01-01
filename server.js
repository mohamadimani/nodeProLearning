const App = require('./app');
require('dotenv').config();
require('app-module-path').addPath(__dirname);
global.config = require('./config');

new App()