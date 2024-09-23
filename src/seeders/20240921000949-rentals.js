'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rentals', [
      {
        startDate: "2023-01-01",
        endDate: "2023-01-10",
        price: 2015.33,
        userId: 1,
        carId: 1
      },
      {
        startDate: "2023-01-01",
        endDate: "2023-01-07",
        price: 1224.89,
        userId: 2,
        carId: 2
      },
      {
        startDate: "2023-01-11",
        endDate: "2023-01-20",
        price: 3423.99,
        userId: 2,
        carId: 1
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rentals', null, {})
  }
};
