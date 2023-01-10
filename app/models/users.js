const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// const uniqueString = require('unique-string');
const User = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    rememberToken: { type: String, default: '' },
}, {
    timestamps: true
})

User.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(15)
    const hash = bcrypt.hashSync(this.password, salt)
    this.password = hash;
    next();
})

User.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

User.methods.setRememberToken = function (res) {
    const salt = bcrypt.genSaltSync()
    const token = salt;
    res.cookie('remember_token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, sign: true });
    this.updateOne({ rememberToken: token }, error => {
        if (error) console.log(error);
    })
}
module.exports = mongoose.model('users', User)