'use strict';
const {
    Model
} = require('sequelize');
const hash = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Employee, { as: 'employee', foreignKey: "employeeId" });
        }
    };
    User.init({
        username: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field username is require'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field password is require'
                }
            }
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'projectManager', 'employee']
        },
        employeeId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate(instance) {
                instance.password = hash(instance.password)
                if (instance.employeeId === '') {
                    instance.employeeId = null
                }
            },
            beforeBulkUpdate(instance) {
                if (instance.attributes.employeeId === '') {
                    instance.attributes.employeeId = null
                }
            }

        }
    });
    return User;
};