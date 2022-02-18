module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define(
      'Room',
      {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
  
    Room.associate = models => {
        Room.hasMany(models.Message, { foreignKey: 'roomId', as: 'messages' })
        Room.belongsToMany(models.User, { foreignKey: 'roomId', as: 'users', through: 'user_rooms' })
    }
  
    return Room
  }