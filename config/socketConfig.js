const socketio = require('socket.io');

module.exports = (server) => {
    const io = socketio(server);

    io.on('connection', socket =>{
        socket.on('joinRoom', ({currentUser, roomName}) => {
            socket.join(roomName);

            socket.broadcast.to(roomName).emit('message', {username: 'ChatBot', text: `${currentUser} has joined the chat.`, time: 'Now'});
        
            socket.on('chatMessage', msg=>{
                io.to(roomName).emit('message', {username: currentUser, text: msg, time: 'Now'});
            });

            socket.on('disconnect', ()=>{
                io.emit('message', {username: 'ChatBot', text: `${currentUser} has left the chat.`, time: 'Now'})
            });
        });
    });
}