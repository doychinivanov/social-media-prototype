const Room = require('../models/Room');

async function createRoom({roomName, password, creatorId}) {
    console.log(roomName);
    console.log(password);
    console.log(creatorId);
    const room = new Room({
        roomName,
        hashedPassword: password,
        participants: [creatorId],
        creator: creatorId,
    });

    await room.save();

    return room;
};


module.exports = {createRoom};