const { autoBind } = require('auto-bind2');
const { resolve } = require('path');
const Recaptcha = require('express-recaptcha').RecaptchaV2;

module.exports = class controller {

    constructor() {
        autoBind(this)
        this.setRecaptcha()
    }

    setRecaptcha() {
        this.recaptcha = new Recaptcha('6LfHHHwjAAAAAPmcqHkDlI8jtmz0uORw_zC2qLDG', '6LfHHHwjAAAAAPHUHpGNeqjooE4zyMEtUgtdusow', {
            'hl': 'fa'
        })
    }

    validationRecaptcha(req, res) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err) => {
                if (err) {
                    req.flash('errors', 'google captcha required!');
                    res.redirect('/auth/register')
                } else {
                    resolve(true)
                }
            })
        })
    }

}