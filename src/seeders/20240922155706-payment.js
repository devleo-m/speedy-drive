'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payments', [
      {
        method: 'DEBIT',
        status: 'UNPAID',
        rentalId: 1
      },
      {
        method: 'CREDIT',
        status: 'UNPAID',
        rentalId: 2
      },
      {
        method: 'PIX',
        status: 'UNPAID',
        rentalId: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, {})
  }
};
