const express = require('express')
const app = express()

const apiRoutes = require('./api/routes')

app.use(express.json())

app.use(express.static('public'))

app.use('/api/', apiRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Running server on port: ${PORT}`)
})