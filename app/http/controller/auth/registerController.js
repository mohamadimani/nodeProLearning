const user = require('./../../../models/users')
const { validationResult } = require('express-validator');
const controller = require('./../controller')
const { request } = require('http');
const passport = require('passport');

class registerController extends controller {

    showForm(req, res) {
        res.render('home/auth/register', { messages: req.flash('errors'), recaptcha: this.recaptcha.render() })
    }

    async registerProccess(req, res, next) {

        this.validationRecaptcha(req, res, next)
            .then(result => validationResult(req))
            .then(result => {
                if (!result.isEmpty()) {
                    const errors = result.array()
                    const messages = []
                    errors.forEach(error => messages.push(error.msg));
                    req.flash('errors', messages)
                    res.redirect('/auth/register')
                } else {
                    this.register(req, res, next)
                }
            })
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