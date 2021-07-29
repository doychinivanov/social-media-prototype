const Msg = require('../models/Message');

async function createMsg(text, author, date){
    const msg = new Msg({
        text: text.trim(),
        author,
        createdAt: date
    });

    await msg.save();

    return msg;
}

module.exports = {createMsg}