'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('EmployeeProjects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            employeeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Employees",
                    key: "id"
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            projectId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Projects",
                    key: "id"
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            position: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('EmployeeProjects');
    }
};