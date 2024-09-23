'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const hash = await bcrypt.hash('root', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: hash,
        role: 'ADMIN',
      },
      {
        name: 'Client User',
        email: 'client@gmail.com',
        password: hash,
        role: 'CLIENT',
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
