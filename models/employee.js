'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Employee.belongsToMany(models.Project, { as: 'projectEmployee', sourceKey: 'id', foreignKey: "employeeId", through: models.EmployeeProject })
            Employee.hasMany(models.Project, { as: 'managerProject', foreignKey: "managerId" });
            Employee.hasOne(models.User, { foreignKey: "employeeId" });
            Employee.belongsTo(models.Position, { foreignKey: "positionId" });
        }

        static fullname() {
            return `${this.first_name} ${this.last_name}`
        }
    };
    Employee.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        photo: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        positionId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Employee',
    });
    return Employee;
};