'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cars', [
      {     
        model: 'Celta',
        brand: 'Chevrolet',
        year: 2013,
        color: 'white',
        plate: 'ABC-1234',
        dailyRate: 97.18,
        status: 'AVAILABLE'
      },
      {
        model: 'Prisma',
        brand: 'Chevrolet',
        color: 'blue',
        year: 2017,
        plate: 'DEF-5678',
        dailyRate: 165.35,
        status: 'AVAILABLE'
      },
      {
        model: 'Fusca',
        brand: 'Volkswagen',
        color: 'yellow',
        year: 1990,
        plate: 'GHI-9012',
        dailyRate: 66.19,
        status: 'AVAILABLE'
      },
      {
        model: 'Civic',
        brand: 'Honda',
        color: 'black',
        year: 2024,
        plate: 'JKL-3456',
        dailyRate: 172.89,
        status: 'AVAILABLE'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
