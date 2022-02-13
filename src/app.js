const express = require('express')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
const { setupSocketIO } = require('./api/ws')

const apiRoutes = require('./api/routes')

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