const passport = require('passport')
const passportLocal = require('passport-local')
const user = require('./../models/users')






passport.use('local-regester', new passportLocal({
    usernameField: 'email',
    passportField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    user.findOne({ 'email': email }, (error, user) => {
        if (error) return done(error);
        if (user) return done(error, false, req.flash('errors', 'this email has been regestered already'))

        const addUser = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        addUser.save(error =>{
            if (error) return done(error, false, req.flash('errors', 'cant regester now! please try again'))
            done(null , addUser)
        });
        res.redirect('/')

    })
}));