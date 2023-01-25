const { User } = require('../models')

const { mailSender } = require('../etc/mailsender')

module.exports = {
  async index(req, res) {
    const { userId } = req

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    })

    if (!user)
      return res.status(404).json({
        err: 'user not found'
      })

    if (!user.verified)
      return res.status(403).json({ err: 'user not verified' })

    return res.json(user)
  },

  async store(req, res) {
    const { name, email, password } = req.body

    //if invalid data input then return an error message
    const invalidCredentials = err => res.status(404).json({ err })
    if (!name)
      return invalidCredentials('name invalid')
    if (!email)
      return invalidCredentials('email invalid')
    if (!password)
      return invalidCredentials('password invalid')

    const user = await User.create({
      name: name,
      email: email,
      password: password,
      verified: Boolean(!mailSender),
    })

    if (!mailSender) return res.json({ user })

    const verifyLink = `http://${req.get('host')}/api/users/verify?userId=${user.id}`

    const mailOptions = {
      to: user.email,
      subject: 'no-reply, verify email',
      html: `Hello, <br/>
          Please Click on the link to verify your email. <br/>
          <a href=${verifyLink}>Click here to verify</a>`
    }

    await mailSender.sendMail(mailOptions)

    return res.json({ message: 'please verify your email' })
  },

  async verify(req, res) {
    const { userId } = req.query

    const user = await User.findByPk(userId)

    if (user.verified)
      return res.json({ err: 'user already verified' })

    await user.update({ verified: true })

    return res.json({ ok: true })
  },

  async delete(req, res) {
    const { userId } = req

    const isDeleted = await User.destroy({
      where: {
        id: userId
      }
    })

    return res.json({ ok: isDeleted })
  }
}
