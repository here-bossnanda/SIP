const router = require('express').Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.index);
router.get('/create', employeeController.create);
router.post('/store', employeeController.store);
router.get('/edit/:id', employeeController.edit);
router.post('/update/:id', employeeController.update);
router.get('/destroy/:id', employeeController.destroy);

module.exports = router