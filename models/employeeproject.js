'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EmployeeProject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    EmployeeProject.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employeeId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field employee require'
                }
            }
        },
        projectId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field project require'
                }
            }
        },
        position: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field position require'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'EmployeeProject',
    });
    return EmployeeProject;
};