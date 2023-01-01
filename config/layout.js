const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const { mainModule } = require('process');


module.exports = {
    PUBLIC_DIR: 'public',
    VIEW_ENGIN: '.ejs',
    VIEW_DIR: path.resolve('resource/views'),
    EJS: {
        expressLayouts,
        main : 'main',
        extractStyle : true,
        extractScript : true
    }
}
