'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      model: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      brand: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      plate: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      dailyRate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('AVAILABLE', 'UNAVAILABLE'),
        allowNull: false,
        defaultValue: 'AVAILABLE'
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Cars');
  }
};
