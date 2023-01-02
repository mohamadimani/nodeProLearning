const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
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

module.exports = mongoose.model('users', User)