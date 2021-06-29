const express = require('express');
const {PORT} = require('./config/index');
const database = require('./config/databaseConfig');
const expressConfig = require('./config/expressConfig');
const router = require('./config/routes');

startApplication();

async function startApplication(){
    const app = express();
    await database(app);
    expressConfig(app);
    router(app);

    app.listen(PORT, () => console.log(`Server listening ong port ${PORT}...`));
}