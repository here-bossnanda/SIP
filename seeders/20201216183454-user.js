'use strict';

const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            { username: "Admin", password: bcrypt.hashSync('secret', bcrypt.genSaltSync(5)), createdAt: new Date(), updatedAt: new Date() },
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', [
            { username: "Admin" },
        ])
    }
};