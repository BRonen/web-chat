'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => (
    await queryInterface.addColumn('Messages', 'roomId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  ),

  down: async (queryInterface, Sequelize) => (
    await queryInterface.removeColumn('Messages', 'roomId')
  )
};
