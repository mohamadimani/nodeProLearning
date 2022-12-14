class loginController {

    showForm(req, res) {
        res.render('home/auth/login')
        res.render('home/auth/register')
    }

}

module.exports = new loginController;