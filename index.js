const express = require('express');
const {PORT} = require('./config/index');
const database = require('./config/databaseConfig');
const expressConfig = require('./config/expressConfig');

startApplication();

async function startApplication(){
    const app = express();
    await database(app);
    expressConfig(app);
    
    app.get('/', (req, res)=> res.send('Hi'))

    app.listen(PORT, () => console.log(`Server listening ong port ${PORT}...`));
}