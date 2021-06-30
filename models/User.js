const {Schema, model} = require('mongoose');

const schema = new Schema({
    username: {type: String, required: [true, 'A username is required!']},
    email: {type: String, required: [true, 'An email is required!']},
    hashedPassword: {type: String, required: [true, 'Password is required!']},
    private: {type: Boolean, default: false},
    birthday: {type: Date, default: null},
    posts: [{}],
    following: [{type: Schema.Types.ObjectId, ref: 'User', default: []}],
    followers: [{type: Schema.Types.ObjectId, ref: 'User', default: []}]
});


module.exports = model('User', schema);