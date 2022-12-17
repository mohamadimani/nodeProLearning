const user = require('./../../../models/users')
const { validationResult } = require('express-validator');
const {autoBind} = require('auto-bind2');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const { request } = require('http');
class registerController {

    constructor() {
        autoBind(this)
        this.setRecaptcha()
    }

    setRecaptcha() {
        this.recaptcha = new Recaptcha('6LfHHHwjAAAAAPmcqHkDlI8jtmz0uORw_zC2qLDG', '6LfHHHwjAAAAAPHUHpGNeqjooE4zyMEtUgtdusow', {
            'hl': 'fa'
        })
    }

    showForm(req, res) {
        res.render('home/auth/register', { messages: req.flash('errors'), recaptcha: this.recaptcha.render() })
    }

    async registerProccess(req, res) {

        this.recaptcha.verify(req, (err) => {
            if (err) {
                req.flash('errors', 'google captcha required!');
                res.redirect('/auth/register')
            } else {
                const result = validationResult(req);
                if (!result.isEmpty()) {
                    const errors = result.array()
                    const messages = []
                    errors.forEach(error => messages.push(error.msg));
                    req.flash('errors', messages)
                    res.redirect('/auth/register')
                } else {
                    const addUser = new user({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    })
                    addUser.save();
                    res.redirect('/')
                }
            }
        })
    }

    loginForm(req, res) {
        res.render('home/auth/login')
    }
}

module.exports = new registerController;