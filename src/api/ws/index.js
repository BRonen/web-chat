function setupSocketIO(io){
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