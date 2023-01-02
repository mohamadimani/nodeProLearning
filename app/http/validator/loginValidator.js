const { check } = require('express-validator')

class loginValidator {
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage('insert your currect email!'),

            check('password')
                .isLength({ min: 5 })
                .withMessage('insert your currect password!'),
        ]

    }
}

module.exports = new loginValidator;