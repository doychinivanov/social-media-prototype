const express = require('express');
const http = require('http');
// const {PORT} = require('./config/index');
const database = require('./config/databaseConfig');
const expressConfig = require('./config/expressConfig');
const socketConfig = require('./config/socketConfig');
const router = require('./config/routes');
// const PORT = process.env.PORT

startApplication();

async function startApplication(){
    const app = express();
    const server = http.createServer(app);
    await database(app);
    expressConfig(app);
    router(app);
    socketConfig(server);

    server.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${PORT}...`));
}