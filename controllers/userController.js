const { User, Employee } = require('../models/index');

class UserController {
    static index(req, res) {
        User.findAll({
                order: [
                    ['username', 'ASC']
                ],
                include: ['employee']
            })
            .then(user => {
                const checkMessage = UserController.checkError(req, res);
                const checkLogin = req.session.userId;
                res.render('page/user/index', { user, checkLogin, checkMessage })
            }).catch(err => {
                res.send(err)
            })
    }

    static create(req, res) {
        Employee.findAll({
                include: ['position']
            })
            .then(employee => {
                const checkLogin = req.session.userId;
                const checkValidate = UserController.checkError(req, res);
                res.render('page/user/create', { employee, checkLogin, checkValidate })
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static store(req, res) {
        const { username, password, role, employeeId } = req.body;
        const input = { username, password, role, employeeId };

        User.create(input)
            .then(user => {
                res.app.locals = {
                    status: 'success',
                    message: 'success add new user'
                }
                res.redirect('/users')
            })
            .catch(err => {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => {
                        temp.push(el.message);
                    })

                    res.app.locals = {
                        status: 'warning',
                        message: temp
                    }
                }

                res.redirect('/users/create')
            });
    }

    static edit(req, res) {
        let data = {};
        User.findByPk(+req.params.id, {
                include: ['employee']
            })
            .then(user => {
                if (!user) {
                    res.app.locals = {
                        status: 'error',
                        message: 'user not found'
                    }
                    res.redirect('/users')
                } else {
                    data.user = user;
                    return Employee.findAll({
                        include: ['position']
                    })
                }
            }).then(employee => {
                const checkLogin = req.session.userId;
                const checkValidate = UserController.checkError(req, res);
                data.employee = employee;
                // console.log(data);
                res.render('page/user/edit', { data, checkLogin, checkValidate })
            })
            .catch(err => res.send(err.message));
    }

    static update(req, res) {
        const { id, username, role, employeeId } = req.body;
        const input = { username, role, employeeId };
        // console.log(input);
        User.update(input, {
                where: { id: +id }
            })
            .then(user => {
                res.app.locals = {
                    status: 'success',
                    message: 'success updated user'
                }

                res.redirect('/users')
            })
            .catch(err => {
                res.send(err)
                    // let temp = [];

                // if (err.errors.length > 0) {
                //     err.errors.forEach(el => {
                //         temp.push(el.message);
                //     })

                //     res.app.locals = {
                //         status: 'warning',
                //         message: temp
                //     }
                // }

                // res.redirect(`/users/edit/${id}`)
            });
    }

    static destroy(req, res) {
        User.findByPk(+req.params.id)
            .then(user => {
                if (!user) {
                    res.app.locals = {
                        status: 'error',
                        message: 'user not found'
                    }
                    res.redirect('/users')
                } else if (+req.params.id === +req.session.userId) {
                    res.app.locals = {
                        status: 'error',
                        message: 'you cannot delete your account'
                    }
                    res.redirect('/users')
                } else {
                    res.app.locals = {
                        status: 'success',
                        message: 'successfully delete data'
                    }
                    user.destroy()
                    res.redirect('/users')
                }
            })
    }

    static checkError(req, res) {
        let errors;
        if (req.app.locals.message) {
            const { status, message } = req.app.locals;
            errors = { status, message };

            delete req.app.locals.status;
            delete req.app.locals.message;
        }
        return errors
    }

}

module.exports = UserController;