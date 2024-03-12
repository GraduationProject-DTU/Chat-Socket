const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
  fs.readFile(__dirname + '/index.html', (err, data) => {
    res.writeHead(200);
    res.end(data);
  });
});

const io = socketio(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
