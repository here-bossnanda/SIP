const isLogin = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.app.locals = {
            status: 'warning',
            message: 'please, login first!'
        }
        res.redirect('/login')
    }
}

module.exports = isLogin;