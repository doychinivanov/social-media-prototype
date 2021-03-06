const {Schema, model} = require('mongoose');

const schema = new Schema ({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now},
    content: {type: String, required: [true, 'Please enter yout comment!']},
    postId: {type: Schema.Types.ObjectId, ref: 'Post'}
});

module.exports = model('Comment', schema);