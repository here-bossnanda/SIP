const router = require('express').Router();

const loginController = require('../controllers/loginController');

const employeeRouter = require('./employee');
const projectRouter = require('./project');
const positionRouter = require('./position');
const userRouter = require('./user');

const isLogin = require('../middleware/isLogin');

router.get('/', isLogin, (req, res) => res.render('index', { checkLogin: req.session.userId }));
router.get('/login', loginController.toLogin);
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);


router.use('/employees', isLogin, employeeRouter);
router.use('/projects', isLogin, projectRouter);
router.use('/positions', isLogin, positionRouter);
router.use('/users', isLogin, userRouter);


module.exports = router;