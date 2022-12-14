const user = require('./../../../models/users')
class registerController {

    showForm(req, res) {
        res.render('home/auth/register')
    }

    registerProccess(req, res) {

        const addUser = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        addUser.save();
        res.redirect('/')
    }

    loginForm(req, res) {
        res.render('home/auth/login')
    }
}

module.exports = new registerController;