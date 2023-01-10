const User = require('./../../models/users')
const middelware = require('./../middleware/middelware')
class rememberLogin extends middelware {
    handle(req, res, next) {
        if (!req.isAuthenticated()) {
            const rememberToken = req?.signedCookies?.remember_token;
            if (rememberToken) {
                return this.userFind(rememberToken, req, next)
            }
        }
        next()
    }

    userFind(rememberToken, req, next) {
        User.findOne({ rememberToken })
            .then(user => {
                if (user) {
                    req.login(user, error => {
                        if (error) console.log(error)
                        next();
                    });
                } else {
                    next();
                }
            })
    }

}

module.exports = new rememberLogin();