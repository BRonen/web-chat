const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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

  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
  })

  User.prototype.auth = async function(password) {
    return await bcrypt.compare(password, this.password)
  }

  User.associate = models => {
    User.hasMany(models.Message, { foreignKey: 'userId', as: 'messages' })
    User.belongsToMany(models.Room, { foreignKey: 'userId', as: 'rooms', through: 'user_rooms' })
  }

  return User
}