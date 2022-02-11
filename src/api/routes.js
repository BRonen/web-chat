const router = require('express').Router()

const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')

const { authTest } =  require('./middlewares/auth')

router.get('/', (req, res) => (
  res.json({server: 'running...'})
))

router.get('/auth', authTest, (req, res) => (
  res.json({ id: req.userId }) //only a debug temp route
))

router.post('/auth', AuthController.store)

router.get('/users', UserController.index)
      .post('/users', UserController.store)

module.exports = router