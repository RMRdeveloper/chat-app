require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const EXECUTE_PORT = process.env.PORT;

// socket config
const server = http.createServer(app);
const io = socketIO(server);

// execute socket
require('./sockets.js')(io);

// middlewares
app.use(express.static('public'));

app.get('/', (req, res, next) => {
	res.send(path.join(__dirname, 'index.html'));
});

server.listen(EXECUTE_PORT, () => console.log(`Feliz Chat! server on port ${EXECUTE_PORT}`));
