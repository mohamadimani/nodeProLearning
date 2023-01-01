const user = require('app/models/users')

const controller = require('app/http/controller/controller')
const { request } = require('http');
const passport = require('passport');

class registerController extends controller {

    showForm(req, res) {
        res.render('home/auth/register', { messages: req.flash('errors'), recaptcha: this.recaptcha.render() })
    }

    async registerProccess(req, res, next) {

        await this.validationRecaptcha(req, res, next)
        const result = await this.validationForm(req, res)
        if (result) {
            this.register(req, res, next)
        }
        //else {
        //     res.redirect('/auth/register');
        // }
    }

    register(req, res, next) {
        passport.authenticate('local.register', {
            successRedirect: '/',
            failureRedirect: '/auth/register',
            failureFlash: true
        })(req, res, next)
    }

    loginForm(req, res) {
        res.render('home/auth/login')
    }
}

module.exports = new registerController;