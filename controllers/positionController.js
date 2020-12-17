const { Position } = require('../models/index');
class PositionController {
    static index(req, res) {
        Position.findAll({
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(position => {
                const checkMessage = PositionController.checkError(req, res);
                const checkLogin = req.session.userId;
                res.render('page/position/index', { position, checkLogin, checkMessage })
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static create(req, res) {
        const checkLogin = req.session.userId;
        const checkValidate = PositionController.checkError(req, res);

        res.render('page/position/create', { checkLogin, checkValidate })
    }

    static store(req, res) {
        const { name } = req.body;

        Position.create({ name })
            .then(position => {
                res.app.locals = {
                    status: 'success',
                    message: 'success add new position'
                }

                res.redirect('/positions')
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

                res.redirect('/positions/create')
            });
    }

    static edit(req, res) {
        Position.findByPk(+req.params.id)
            .then(position => {
                if (!position) {
                    res.app.locals = {
                        status: 'error',
                        message: 'position not found'
                    }
                    res.redirect('/positions')
                } else {
                    const checkLogin = req.session.userId;
                    const checkValidate = PositionController.checkError(req, res);

                    res.render('page/position/edit', { position, checkLogin, checkValidate })
                }
            })
            .catch(err => res.send(err.message));
    }

    static update(req, res) {
        const { id, name } = req.body;

        Position.update({ name }, {
                where: { id }
            })
            .then(position => {
                res.app.locals = {
                    status: 'success',
                    message: 'success updated position'
                }

                res.redirect('/positions')
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

                res.redirect(`/positions/edit/${id}`)
            });
    }

    static destroy(req, res) {
        Position.findByPk(+req.params.id)
            .then(position => {
                if (!position) {
                    res.app.locals = {
                        status: 'error',
                        message: 'position not found'
                    }
                    res.redirect('/positions')
                } else {
                    res.app.locals = {
                        status: 'success',
                        message: 'successfully delete data'
                    }
                    position.destroy()
                    res.redirect('/positions')
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

module.exports = PositionController;