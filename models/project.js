'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Project.belongsToMany(models.Employee, { as: "employee", sourceKey: 'id', foreignKey: "projectId", through: models.EmployeeProject })
            Project.belongsTo(models.Employee, { as: "manager", foreignKey: "managerId" });
        }
    };
    Project.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field name require'
                }
            }
        },
        budget: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field budget require'
                }
            }
        },
        start_date: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    msg: 'field start date require'
                },
                isGreaterThanEndDateField(value) {
                    if (value > this.end_date) {
                        throw new Error('Start date must be less than end date.');
                    }
                },
                isNotYesterday(value) {
                    if (value < new Date()) {
                        throw new Error('Start date at least start today.');
                    }
                }
            }
        },
        end_date: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    msg: 'field end date require'
                }
            }
        },
        status: {
            type: DataTypes.ENUM,
            values: ['Idle', 'OnProgress', 'Complate'],
        },
        managerId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field manager require'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Project',
        hooks: {
            beforeCreate(instance) {
                instance.status = 'Idle';
            }
        }
    });
    return Project;
};