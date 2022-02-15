const { WSmiddleware } = require('../middlewares/auth')

function setupSocketIO(io){
    io.use(WSmiddleware)

    io.on('connection', function(socket) {
        //default room
        const room = 'default'
        socket.join(room)
     
        //disconnect
        socket.on('disconnect', function() {
        })
    })
}

module.exports = { setupSocketIO }