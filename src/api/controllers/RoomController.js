const { User, Room } = require('../models')

module.exports = {
  async index(req, res){
    const { userId } = req

    const user = await User.findByPk(userId)

    if(!user)
      return res.status(404).json({
        err: 'user not found'
      })

    const rooms = await user.getRooms({
      include: [{
        association: 'users',
        attributes: {
          exclude: ['password']
        }
      }]
    })
    
    return res.json({rooms})
  },

  async store(req, res){
    const { userId } = req
    const { name, password } = req.body

    const [room, hasBeenCreated] = await Room.findOrCreate({
      where: { name: name },
      defaults: {
        name: name,
        password: password
      },
      attributes: { exclude: ['password'] }
    })

    if(room.hasUser(userId))
      return res.status(400).json({
        err: 'user already is in this room'
      })

    if(!room.auth(password))
      return res.status(404).json({
          err: 'wrong room password'
      })

    const user = await User.findByPk(userId)

    if(!user)
      return res.status(404).json({
        err: 'user not found'
      })

    await user.addRoom(room)
    
    return res.json({room, hasBeenCreated})
  }
}