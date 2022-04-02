const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define(
      'Room',
      {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
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

    Room.beforeCreate(async (room, options) => {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(room.password, salt)
      room.password = hash
    })
  
    Room.prototype.auth = async function(password) {
      return await bcrypt.compare(password, this.password)
    }
  
    Room.associate = models => {
        Room.hasMany(models.Message, { foreignKey: 'roomId', as: 'messages' })
        Room.belongsToMany(models.User, { foreignKey: 'roomId', as: 'users', through: 'user_rooms' })
    }
  
    return Room
  }