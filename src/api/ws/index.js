const { WSmiddleware } = require('../middlewares/auth')

function setupSocketIO(io){
    io.use(WSmiddleware)

    io.on('connection', socket => {
        //disconnect
        socket.on('disconnecting', socket => {
            if(socket.rooms){
                for(const room of socket.rooms){
                    if(room !== socket.id)
                        socket.to(room).emit("user:left", socket.id)
                }
            }
        })
    })
}

module.exports = { setupSocketIO }