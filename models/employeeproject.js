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
    employeeId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    position: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeProject',
  });
  return EmployeeProject;
};