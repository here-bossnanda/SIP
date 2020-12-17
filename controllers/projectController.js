const { Project, Employee, EmployeeProject } = require('../models/index');
const rupiah = require('../helpers/convertRupiah');
const deadline = require('../helpers/deadline');

class ProjectController {
    static index(req, res) {
        Project.findAll({
                order: [
                    ['name', 'ASC']
                ],
                include: ['manager', 'employee']
            })
            .then(project => {
                const checkMessage = ProjectController.checkError(req, res);
                const checkLogin = req.session.userId;
                const formatRupiah = rupiah;
                const moment = deadline

                res.render('page/project/index', { moment, formatRupiah, project, checkLogin, checkMessage })
            }).catch(err => {
                res.send(err)
            })
    }

    static create(req, res) {
        Employee.findAll({
                where: {
                    positionId: 1
                },
                include: ['position']
            })
            .then(manager => {
                console.log(manager);
                const checkLogin = req.session.userId;
                const checkValidate = ProjectController.checkError(req, res);
                res.render('page/project/create', { manager, checkLogin, checkValidate })
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static store(req, res) {
        const { name, budget, start_date, end_date, managerId } = req.body
        const input = { name, budget, start_date, end_date, managerId };

        Project.create(input)
            .then(data => {
                res.app.locals = {
                    status: 'success',
                    message: 'success add new project'
                }

                res.redirect('/projects')
            }).catch(err => {
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

                res.redirect('/projects/create')
            })

    }

    static edit(req, res) {
        let data = {}
        Project.findByPk(+req.params.id, {
                include: ['manager']
            })
            .then(project => {
                if (!project) {
                    res.app.locals = {
                        status: 'error',
                        message: 'project not found'
                    }
                    res.redirect('/projects')
                } else {
                    data.project = project;
                    return Employee.findAll({
                        where: {
                            positionId: 1
                        },
                        include: ['position']
                    })
                }
            })
            .then(manager => {
                const checkLogin = req.session.userId;
                const checkValidate = ProjectController.checkError(req, res);
                data.manager = manager;
                res.render('page/project/edit', { data, checkLogin, checkValidate })
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static update(req, res) {
        const { id, name, budget, start_date, end_date, managerId } = req.body
        const input = { name, budget, start_date, end_date, managerId };

        Project.update(input, {
                where: { id }
            })
            .then(project => {
                res.app.locals = {
                    status: 'success',
                    message: 'success updated project'
                }

                res.redirect('/projects')
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

                res.redirect(`/projects/edit/${id}`)
            });
    }

    static destroy(req, res) {
        Project.findByPk(+req.params.id)
            .then(project => {
                if (!project) {
                    res.app.locals = {
                        status: 'error',
                        message: 'project not found'
                    }
                    res.redirect('/projects')
                } else {
                    res.app.locals = {
                        status: 'success',
                        message: 'successfully delete data'
                    }
                    project.destroy()
                    res.redirect('/projects')
                }
            })
    }

    static addEmployee(req, res) {
        let data = {}
        Project.findByPk(+req.params.id, {
                include: ['employee', 'manager']
            })
            .then(project => {
                if (!project) {
                    res.app.locals = {
                        status: 'error',
                        message: 'project not found'
                    }
                    res.redirect('/projects')
                } else {
                    data.project = project;
                    return Employee.findAll({ where: { positionId: 2 }, include: ['position'] })
                }
            })
            .then(employee => {
                data.employee = employee;
                const formatRupiah = rupiah;
                const moment = deadline
                const checkLogin = req.session.userId;
                const checkValidate = ProjectController.checkError(req, res);
                res.render('page/project/addEmployee', { formatRupiah, moment, data, checkLogin, checkValidate })
            })
    }

    static storeEmployee(req, res) {
        const { projectId, employeeId, position } = req.body;
        const input = { projectId, employeeId, position };

        EmployeeProject.create(input)
            .then(data => {
                res.redirect(`/projects/add-employee/${projectId}`)
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

                res.redirect(`/projects/add-employee/${projectId}`)
            })
    }

    static removeEmployee(req, res) {
        const projectId = +req.params.id
        EmployeeProject.findByPk(+req.params.id_remove)
            .then(project => {
                if (!project) {
                    res.app.locals = {
                        status: 'error',
                        message: 'employee not found'
                    }
                    res.redirect(`/projects/add-employee/${projectId}`)
                } else {
                    project.destroy()
                    res.redirect(`/projects/add-employee/${projectId}`)
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

module.exports = ProjectController;