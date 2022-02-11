const { User } = require('../models')

module.exports = {
  async index(req, res){
    const users = await User.findAll()

    return res.json(users)
  },

  async store(req, res){
    const { name, email, password } = req.body

    if(!name)
      return res.status(404).json({
        err: 'name invalid'
      })
    if(!email)
      return res.status(404).json({
        err: 'email invalid'
      })
    if(!password)
      return res.status(404).json({
        err: 'password invalid'
      })

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    })

    user.password = undefined

    return res.json(user)
  },
}