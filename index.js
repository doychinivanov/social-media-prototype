const express = require('express');
const http = require('http');
const database = require('./config/databaseConfig');
const expressConfig = require('./config/expressConfig');
const socketConfig = require('./config/socketConfig');
const router = require('./config/routes');
const PORT = process.env.PORT || 3000

startApplication();

async function startApplication(){
    const app = express();
    const server = http.createServer(app);
    // await database(app);
    expressConfig(app);
    router(app);
    socketConfig(server);
    server.listen(PORT);
}