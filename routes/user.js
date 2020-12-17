const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.index);
router.get('/create', userController.create);
router.post('/store', userController.store);
router.get('/edit/:id', userController.edit);
router.post('/update/:id', userController.update);
router.get('/destroy/:id', userController.destroy);


module.exports = router