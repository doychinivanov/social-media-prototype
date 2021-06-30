const {Schema, model} = require('mongoose');

const schema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now},
    content: {type: String, required: [true, 'You cannot create an empty post!']},
    likes: [{type: Schema.Types.ObjectId, ref: 'User', default: []}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment', default: []}]
});

module.exports = model('Post', schema);