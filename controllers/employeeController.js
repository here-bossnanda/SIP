const { Employee } = require('../models/index');
class EmployeeController {
    static index(req, res) {
        Employee.findAll({
                include: ['projectEmployee', 'managerProject']
            })
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.send(err)
            })
    }
}

module.exports = EmployeeController;