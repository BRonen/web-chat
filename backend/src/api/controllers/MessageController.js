const { Room, Message } = require('../models')

module.exports = {
  async index(req, res){
    const { userId } = req
    const { roomId } = req.params

    const room = await Room.findByPk(roomId, {
      include: {
        association: 'messages',
        include: {
          association: 'author',
          attributes: {
            exclude: ['password']
          }
        }
      }
    })

    if(!room)
      return res.status(503).json({
        err: 'room not found'
      })

    const inRoom = room.hasUser(userId)

    if(!inRoom)
      return res.status(503).json({
        err: 'user isnt in this room'
      })

    const { messages } = room

    return res.json({messages})
  },

  async store(req, res){
    const { userId } = req
    const { roomId } = req.params
    const { content } = req.body

    if(!content)
      return res.status(404).json({
        err: 'message content invalid'
      })

    const message = await Message.create({
      userId: userId,
      content: content,
      roomId: roomId
    })

    const author = await message.getAuthor({
      attributes: {
        exclude: ['password']
      }
    })

    const messageData = {...message.dataValues, author}
    req.io.emit('message:send', messageData)

    return res.json({ message: messageData })
  },

  async delete(req, res){
    const { userId } = req
    const { roomId } = req.params
    const { messageId } = req.body
    
    const messages = await Message.findAll({
      where: {
        id: messageId,
        roomId: roomId,
        userId: userId
      }
    })

    messages.forEach(async message => {
      await message.destroy()

      req.io.emit('message:delete', message.id)
    })

    return res.json({messages})
  },

  async clear(req, res){
    const messages = await Message.destroy({
      where: {}
    })

    return res.json({messages})
  },
}