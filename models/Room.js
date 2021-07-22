const {Schema, model} = require('mongoose');

const schema = new Schema({
    roomName: {type: String, required: [true, 'A room must have a name!'], minLength: [4, 'The name must be at least 4 characters!'], maxLength: [18, 'Room name cannot exceed 18 characters!']},
    hashedPassword: {type: String, required: [true, 'Password is required in order your room to be secure!']},
    participants: [{type: Schema.Types.ObjectId, ref: 'User', default: []}],
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = model('Room', schema);