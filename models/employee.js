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
            Employee.belongsTo(models.Position, { as: 'position', foreignKey: "positionId" });
        }

        fullname() {
            return `${this.first_name} ${this.last_name}`
        }
    };
    Employee.init({
        first_name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field first name require'
                }
            }
        },
        last_name: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field gender require'
                }
            }
        },
        phone_number: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field phone number require'
                }
            }
        },
        positionId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field position require'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Employee',
        hooks: {
            beforeCreate: (instance) => {
                if (instance.last_name.length === 0) {
                    instance.last_name = instance.first_name;
                }
            },
            beforeBulkUpdate: (instance) => {
                if (instance.attributes.last_name.length === 0) {
                    instance.attributes.last_name = instance.attributes.first_name;
                }
            }
        }
    });
    return Employee;
};