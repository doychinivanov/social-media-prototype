const mongoose = require('mongoose');
// const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
// console.log(DB_CONNECTION_STRING)

module.exports = (app) => {
    return new Promise((resolve, reject)=>{
        mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;
        db.on('error', (err)=>{
            console.error('Failed to connect to database...');
            reject(err);
        });
        db.once('open', ()=>{
            console.log('Successfully connected to database...');
            resolve();
        });
    });
};