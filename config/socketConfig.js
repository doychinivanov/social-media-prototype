const socketio = require('socket.io');

module.exports = (server) => {
    const io = socketio(server);

    io.on('connection', socket =>{
        socket.on('joinRoom', ({username, room}) => {
            socket.emit('message', 'Welcome to Socket.io');

            socket.broadcast.to(room).emit('message', 'A user has joined');
        });



        socket.on('disconnect', ()=>{
            io.emit('message', 'A user has left the chat.')
        });
    });
}