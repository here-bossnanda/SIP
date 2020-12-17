const { User } = require('../models/index');
const bcrypt = require('bcrypt');

class LoginController {
    static toLogin(req, res) {
        let errors;
        if (req.app.locals.message) {
            const { status, message } = req.app.locals;
            errors = { status, message };

            delete req.app.locals.status;
            delete req.app.locals.message;
        }
        let checkLogin = req.session.userId;

        res.render('page/auth/login', { errors, checkLogin });
    }

    static login(req, res) {
        const { username, password } = req.body;

        User.findOne({ where: { username } })
            .then(user => {
                if (!user) {
                    res.app.locals = {
                        status: 'warning',
                        message: 'user not found'
                    }
                    res.redirect('/login')
                } else {
                    const checkPassword = bcrypt.compareSync(password, user.password)

                    if (checkPassword) {
                        req.session.userId = user.id
                        res.redirect('/')
                    } else {
                        res.app.locals = {
                            status: 'warning',
                            message: 'username atau password salah'
                        }
                        res.redirect('/login')
                    }
                }

            })
            .catch(err => {
                res.send(err.message)
            })

    }

    static logout(req, res) {
        delete req.session.userId;
        res.redirect('/login')
    }

}

module.exports = LoginController;