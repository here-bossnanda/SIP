const router = require('express').Router();

const employeeRouter = require('./employee');
const projectRouter = require('./project');
const positionRouter = require('./position');
const userRouter = require('./user');

router.get('/', (req, res) => res.render('index'));
router.use('/employee', employeeRouter);
router.use('/projects', projectRouter);
router.use('/positions', positionRouter);
router.use('/users', userRouter);


module.exports = router;