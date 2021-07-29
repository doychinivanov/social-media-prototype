const {Schema, model} = require('mongoose');

const schema = new Schema({
    text: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: String},
});

module.exports = model('Message', schema);