const express = require('express')
const app = express()

const cors = require('cors')

const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
})

const { setupSocketIO } = require('./api/ws')

const apiRoutes = require('./api/routes')

app.use(cors())
app.use(express.json())

app.use(express.static('public'))

app.use((req, res, next) => {
    req.io = io
  
    return next()
})

app.use('/api/', apiRoutes)

setupSocketIO(io)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Running server on port: ${PORT}`)
})