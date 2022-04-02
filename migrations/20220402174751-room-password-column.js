'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Rooms', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Rooms', 'password')
  },
}