const socketio = require('socket.io');
const {createMsg} = require('../services/msgService');
const {getRoomByName} = require('../services/roomService');

module.exports = (server) => {
    const io = socketio(server);

    io.on('connection', socket =>{
        socket.on('joinRoom', ({currentUsername, currentUserId, roomName}) => {
            socket.join(roomName);

            socket.broadcast.to(roomName).emit('message', {username: 'ChatBot', text: `${currentUsername} has joined the chat.`, time: new Date().toLocaleTimeString()});
        
            socket.on('chatMessage', async (msg)=>{
                const time = new Date().toLocaleTimeString();

                try{
                    const currentRoom = await getRoomByName(roomName.trim());
                    const newMsg = await createMsg(msg, currentUserId, time);
                    currentRoom.messages.push(newMsg);
                    currentRoom.save();
                    io.to(roomName).emit('message', {username: currentUsername, text: msg, time});
                } catch(err){
                    console.log(err.message);
                }

            });

            socket.on('disconnect', ()=>{
                io.emit('message', {username: 'ChatBot', text: `${currentUsername} has left the chat.`, time: new Date().toLocaleTimeString()})
            });
        });
    });
}