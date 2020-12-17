const { Employee, Position } = require('../models/index');
class EmployeeController {
    static index(req, res) {
        Employee.findAll({
                order: [
                    ['first_name', 'ASC']
                ],
                include: ['projectEmployee', 'position']
            })
            .then(employee => {
                const checkMessage = EmployeeController.checkError(req, res);
                const checkLogin = req.session.userId;
                res.render('page/employee/index', { employee, checkLogin, checkMessage })
            }).catch(err => {
                res.send(err)
            })
    }

    static create(req, res) {
        Position.findAll()
            .then(position => {
                const checkLogin = req.session.userId;
                const checkValidate = EmployeeController.checkError(req, res);
                res.render('page/employee/create', { position, checkLogin, checkValidate })
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static store(req, res) {
        const { first_name, last_name, gender, phone_number, positionId } = req.body;
        const input = { first_name, last_name, gender, phone_number, positionId };

        Employee.create(input)
            .then(employee => {
                res.app.locals = {
                    status: 'success',
                    message: 'success add new employee'
                }

                res.redirect('/employees')
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

                res.redirect('/employees/create')
            });
    }

    static edit(req, res) {
        let data = {};
        Employee.findByPk(+req.params.id)
            .then(employee => {
                if (!employee) {
                    res.app.locals = {
                        status: 'error',
                        message: 'employee not found'
                    }
                    res.redirect('/employees')
                } else {
                    data.employee = employee;
                    return Position.findAll()
                }
            }).then(position => {
                const checkLogin = req.session.userId;
                const checkValidate = EmployeeController.checkError(req, res);
                data.position = position;
                res.render('page/employee/edit', { data, checkLogin, checkValidate })
            })
            .catch(err => res.send(err.message));
    }

    static update(req, res) {
        const { id, first_name, last_name, gender, phone_number, positionId } = req.body;
        const input = { first_name, last_name, gender, phone_number, positionId };


        Employee.update(input, {
                where: { id }
            })
            .then(employee => {
                res.app.locals = {
                    status: 'success',
                    message: 'success updated employee'
                }

                res.redirect('/employees')
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

                res.redirect(`/employees/edit/${id}`)
            });
    }

    static destroy(req, res) {
        Employee.findByPk(+req.params.id)
            .then(employee => {
                if (!employee) {
                    res.app.locals = {
                        status: 'error',
                        message: 'employee not found'
                    }
                    res.redirect('/employees')
                } else {
                    res.app.locals = {
                        status: 'success',
                        message: 'successfully delete data'
                    }
                    employee.destroy()
                    res.redirect('/employees')
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

module.exports = EmployeeController;