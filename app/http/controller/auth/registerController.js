const user = require('./../../../models/users')
const { validationResult } = require('express-validator');
const controller = require('./../controller')
const { request } = require('http');

class registerController extends controller {
   
    showForm(req, res) {
        res.render('home/auth/register', { messages: req.flash('errors'), recaptcha: this.recaptcha.render() })
    }

    async registerProccess(req, res) {

        this.validationRecaptcha(req, res)
            .then(result => validationResult(req))
            .then(result => {
                if (!result.isEmpty()) {
                    const errors = result.array()
                    const messages = []
                    errors.forEach(error => messages.push(error.msg));
                    req.flash('errors', messages)
                    res.redirect('/auth/register')
                }
            })

        // this.recaptcha.verify(req, (err) => {
        //     if (err) {
        //         req.flash('errors', 'google captcha required!');
        //         res.redirect('/auth/register')
        //     } else {
        //         const result = validationResult(req);
        //         if (!result.isEmpty()) {
        //             const errors = result.array()
        //             const messages = []
        //             errors.forEach(error => messages.push(error.msg));
        //             req.flash('errors', messages)
        //             res.redirect('/auth/register')
        //         } else {
        //             const addUser = new user({
        //                 name: req.body.name,
        //                 email: req.body.email,
        //                 password: req.body.password,
        //             })
        //             addUser.save();
        //             res.redirect('/')
        //         }
        //     }
        // })
    }

    loginForm(req, res) {
        res.render('home/auth/login')
    }
}

module.exports = new registerController;