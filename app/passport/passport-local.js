const passport = require('passport')
const localStrategy = require('passport-local')
const user = require('../models/users')

passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passportField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    user.findOne({ 'email': email }, (error, userParam) => {
        if (error) return done(error);
        if (userParam) return done(error, false, req.flash('errors', 'this email has been regestered already'))

        const addUser = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        addUser.save(error => {
            if (error) return done(error, false, req.flash('errors', 'cant regester now! please try again'))
            done(null, addUser)
        });

    })
}));

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    user.findById(id, function (error, user) {
        done(error, user)
    })
})