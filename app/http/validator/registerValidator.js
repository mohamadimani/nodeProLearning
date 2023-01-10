const { check } = require('express-validator')

class registerValidator {
    handle() {
        return [
            check('name')
                .isLength({ min: 4 })
                .withMessage('insert your currect name!'),

            check('email')
                .isEmail()
                .withMessage('insert your currect email!'),

            check('password')
                .isLength({ min: 4 })
                .withMessage('insert your currect password!'),
        ]

    }
}

module.exports = new registerValidator;