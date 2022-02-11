const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/api/', (req, res) => (
    res.json({hello: 'world'})
))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Running server on port: ${PORT}`)
})