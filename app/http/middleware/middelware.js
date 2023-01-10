const { autoBind } = require('auto-bind2');

module.exports = class middelware {
    constructor() {
        autoBind(this)
    }
}