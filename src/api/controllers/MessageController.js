const { Message } = require('../models')

module.exports = {
  async index(req, res){
    const messages = await Message.findAll({
      include: {
        association: 'author',
        attributes: {
          exclude: ['password']
        }
      }
    })
    return res.json({messages})
  },

  async store(req, res){
    const { userId } = req
    const { content } = req.body

    if(!content)
      return res.status(404).json({
        err: 'message content invalid'
      })

    const message = await Message.create({
      userId: userId,
      content: content
    })

    const author = await message.getAuthor({
      attributes: {
        exclude: ['password']
      }
    })

    req.io.emit('message:send', message.dataValues, author)

    return res.json({ message, author })
  },

  async clear(req, res){
    const messages = await Message.findAll()

    messages.forEach(async message => {
      await message.destroy({ truncate: true, force: true })
    })

    return res.json({ok: true})
  },
}