const router = require('express').Router()

const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const MessageController = require('./controllers/MessageController')

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
      
router.get('/messages', MessageController.index)
      .post('/messages', authTest, MessageController.store)

module.exports = router