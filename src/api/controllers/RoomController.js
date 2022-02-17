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
    const { name } = req.body
    
    const user = await User.findByPk(userId)

    if(!user)
      return res.status(404).json({
        err: 'user not found'
      })

    const [room, isCreated] = await Room.findOrCreate({
      where: { name: name },
      defaults: {
        name: name
      }
    })

    await user.addRoom(room)
    
    return res.json({room, isCreated})
  },

  async connect(req, res){
    const { userId } = req
    const { roomId } = req.body

    const user = await User.findByPk(userId)
    const rooms = await Room.findAll({
      where: {
        id: roomId
      }
    })

    rooms.forEach(async room => {
      await user.addRoom(room)
    })

    return res.json({ok: true})
  }
}