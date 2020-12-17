const router = require('express').Router();
const positionController = require('../controllers/positionController');

router.get('/', positionController.index);
router.get('/create', positionController.create);
router.post('/store', positionController.store);
router.get('/edit/:id', positionController.edit);
router.post('/update/:id', positionController.update);
router.get('/destroy/:id', positionController.destroy);

module.exports = router