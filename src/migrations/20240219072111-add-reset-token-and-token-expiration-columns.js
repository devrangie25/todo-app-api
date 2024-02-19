'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('tbl_users', 'reset_token', {
      type: Sequelize.STRING,
      after: 'active',
      allowNull: true,
      defaultValue: null,
    })

    await queryInterface.addColumn('tbl_users', 'reset_token_expiration', {
      type: Sequelize.STRING,
      after: 'reset_token',
      allowNull: true,
      defaultValue: null,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('tbl_users', 'reset_token');
    await queryInterface.removeColumn('tbl_users', 'reset_token_expiration');
  }
};