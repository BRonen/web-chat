const { User } = require('../models')

const messages = []

module.exports = {
  async index(req, res){
    req.io.emit('message:all', messages)

    return res.json({ok: true})
  },

  async store(req, res){
    const { userId } = req

    const user = await User.findByPk(userId)

    console.log(userId, user)

    if(!user)
      return res.status(404).json({
        err: 'user not found'
      })

    const { content } = req.body

    if(!content)
      return res.status(404).json({
        err: 'message content invalid'
      })

    const message = {
        author: user.name,
        content: content
    }

    messages.push(message)

    req.io.emit('message:send', message)

    return res.json({ok: true})
  },
}