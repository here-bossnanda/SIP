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
            Project.belongsToMany(models.Employee, { foreignKey: "employeeId", through: models.EmployeeProject })
            Project.belongsTo(models.Employee, { foreignKey: "managerId" });
        }
    };
    Project.init({
        name: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        status: {
            type: DataTypes.ENUM,
            values: ['Idle', 'OnProgress', 'Complate'],
        },
        managerId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Project',
    });
    return Project;
};