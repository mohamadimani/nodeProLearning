const controller = require('app/http/controller/controller');
const passport = require('passport');
class loginController extends controller {

    showForm(req, res, next) {
        res.render('home/auth/login', { messages: req.flash('errors'), recaptcha: this.recaptcha.render() })
    }

    async loginProccess(req, res, next) {

        await this.validationRecaptcha(req, res, next)
        const result = await this.validationForm(req, res)
        if (result) {
            this.login(req, res, next);
        }
        //else {
        //     res.redirect('/auth/register');
        // }
    }

    async login(req, res, next) {
        passport.authenticate('local.login', (error, user) => {
            if (!user) return res.redirect('/auth/login');
            req.login(user, error => {
                if (error) console.log(error)
                if (req.body.remember) {
                    user.setRememberToken(res)
                }
                return res.redirect('/')
            })
        })(req, res, next)
    }

    logout(req, res, next) {
        req.logout((req, res, next) => {
        });
        res.clearCookie('remember_token');
        redirect('/')
    }
}

module.exports = new loginController;