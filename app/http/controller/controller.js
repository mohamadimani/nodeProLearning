const { autoBind } = require('auto-bind2');
const { resolve } = require('path');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const { validationResult } = require('express-validator');

module.exports = class controller {

    constructor() {
        autoBind(this)
        this.setRecaptcha()
    }

    setRecaptcha() {
        this.recaptcha = new Recaptcha(config.service.RECAPTCHA.SITE_KEY, config.service.RECAPTCHA.SECRET_KEY, {
            ...config.service.RECAPTCHA.OPTION
        })
    }

    async validationRecaptcha(req, res) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err) => {
                if (err) {
                    req.flash('errors', 'google captcha required!');
                    this.back(req, res);
                } else {
                    resolve(true)
                }
            })
        })
    }

    async validationForm(req, res) {
        const result = await validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array()
            const messages = []
            errors.forEach(error => messages.push(error.msg));
            req.flash('errors', messages)
            this.back(req, res);
            return false;
        } else {
            return true;
        }
    }

    back(req, res) {
        return res.redirect(req.header('Referer') || '/')
    }

}