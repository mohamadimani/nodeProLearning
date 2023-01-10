const passport = require('passport')
// const googleStrategy = require('passport-google-oauth').OAuth2Strategy()
const user = require('../models/users')

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    user.findById(id, function (error, user) {
        done(error, user)
    })
})

// passport.use(new googleStrategy({

// }, function (accessToken, refreshToken, profile, done) {
//     console.log(profile);
// }));    -