const router = require('express').Router()

const UserController = require('./controllers/UserController')


router.get('/', (req, res) => (
  res.json({server: 'running...'})
))

router.get('/users', UserController.index)
      .post('/users', UserController.store)

module.exports = router