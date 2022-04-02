const router = require('express').Router()

const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const RoomController = require('./controllers/RoomController')
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

router.get('/rooms', authMiddleware, RoomController.index)
      .post('/rooms', authMiddleware, RoomController.store)

router.get('/rooms/:roomId/messages', authMiddleware, MessageController.index)
      .post('/rooms/:roomId/messages', authMiddleware, MessageController.store)
      .delete('/rooms/:roomId/messages', authMiddleware, MessageController.delete)

module.exports = router