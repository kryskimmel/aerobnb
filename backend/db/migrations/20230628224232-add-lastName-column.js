'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING(50),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('Users', 'lastName')
  }
};
