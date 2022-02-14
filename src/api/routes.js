const router = require('express').Router()

const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const MessageController = require('./controllers/MessageController')

const { authMiddleware } =  require('./middlewares/auth')

router.get('/', (req, res) => (
  res.json({server: 'running...'})
))

router.get('/auth', authMiddleware, AuthController.index)
      .post('/auth', AuthController.store)

router.get('/users', UserController.index)
      .post('/users', UserController.store)
      
router.get('/messages', authMiddleware, MessageController.index)
      .post('/messages', authMiddleware, MessageController.store)

module.exports = router