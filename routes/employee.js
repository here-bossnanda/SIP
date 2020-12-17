const router = require('express').Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.index)

module.exports = router