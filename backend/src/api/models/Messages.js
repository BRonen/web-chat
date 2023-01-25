module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
          field: 'created_at',
          type: DataTypes.DATE,
      },
      updatedAt: {
          field: 'updated_at',
          type: DataTypes.DATE,
      }
    }
  )

  Message.associate = models => {
    Message.belongsTo(models.User, { foreignKey: 'userId', as: 'author' })
    Message.belongsTo(models.Room, { foreignKey: 'roomId', as: 'room' })
  }

  return Message
}