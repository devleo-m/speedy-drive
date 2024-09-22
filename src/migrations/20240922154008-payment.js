'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      method: {
        type: Sequelize.ENUM('DEBIT','CREDIT', 'PIX', 'MONEY'),
        allowNull: false,
        defaultValue: 'MONEY'
      },
      status: {
        type: Sequelize.ENUM('PAID', 'UNPAID'),
        allowNull: false,
        defaultValue: 'UNPAID'
      },
      paymentDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      rentalId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};
