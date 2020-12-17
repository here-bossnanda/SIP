'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Positions', [
            { name: "Project Manager", createdAt: new Date(), updatedAt: new Date() },
            { name: "Employee", createdAt: new Date(), updatedAt: new Date() }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Positions', [
            { name: "Project Manager" },
            { name: "Employee" }
        ]);
    }
};