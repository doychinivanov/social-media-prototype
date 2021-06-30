const {Schema, model} = require('mongoose');

const schema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    hashedPassword: {type: String, required: true},
    private: {type: Boolean, default: false},
    posts: [{}],
    following: [{type: Schema.Types.ObjectId, ref: 'User', default: []}],
    followers: [{type: Schema.Types.ObjectId, ref: 'User', default: []}]
});


module.exports = model('User', schema);