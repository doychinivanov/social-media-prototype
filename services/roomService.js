const Room = require('../models/Room');

async function createRoom({roomName, password, creatorId}) {
    const room = new Room({
        roomName,
        hashedPassword: password,
        participants: [creatorId],
        creator: creatorId,
        messages: []
    });

    await room.save();

    return room;
};

async function getRoomByName(roomName){
    const pattern = new RegExp(`^${roomName}$`, 'i');
    const room = await Room.findOne({roomName: {$regex: pattern}});

    return room;
}


module.exports = {createRoom, getRoomByName};