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

router.get('/users', authMiddleware, UserController.index)
      .get('/users/verify', UserController.verify)
      .post('/users', UserController.store)
      .delete('/users', authMiddleware, UserController.delete)
      
router.get('/messages', authMiddleware, MessageController.index)
      .post('/messages', authMiddleware, MessageController.store)
      .delete('/messages', authMiddleware, MessageController.delete)
      .delete('/messages/all', authMiddleware, MessageController.clear)

module.exports = router