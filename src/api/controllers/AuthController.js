const { User } = require('../models')

const { genToken } = require('../middlewares/auth')

module.exports = {
  async index(req, res){
    const { userId } = req
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
    })

    return res.json(user)
  },

  async store(req, res){
    const { email, password } = req.body

    if(!email)
      return res.status(404).json({
        err: 'email invalid'
      })
    if(!password)
      return res.status(404).json({
        err: 'password invalid'
      })

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if(!user)
      return res.status(404).json({
        err: 'user not found'
      })

    if(user.auth(password)){
        return res.json({
            token: genToken(user.dataValues)
        })
    }

    return res.status(404).json({
        err: 'wrong password'
    })
  },
}