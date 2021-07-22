const {Schema, model} = require('mongoose');

const schema = new Schema({
    text: {type: String, required},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = model('Message', schema);