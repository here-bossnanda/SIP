const router = require('express').Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.index);
router.get('/create', projectController.create);
router.post('/store', projectController.store);
router.get('/edit/:id', projectController.edit);
router.post('/update/:id', projectController.update);
router.get('/destroy/:id', projectController.destroy);
router.get('/add-employee/:id', projectController.addEmployee);
router.post('/add-employee/:id', projectController.storeEmployee);
router.get('/add-employee/remove/:id/:id_remove', projectController.removeEmployee);



module.exports = router