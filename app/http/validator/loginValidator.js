const { check } = require('express-validator')

class loginValidator {
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage('insert your currect email!'),

            check('password')
                .isLength({ min: 4 })
                .withMessage('insert your currect password!'),
        ]

    }
}

module.exports = new loginValidator;