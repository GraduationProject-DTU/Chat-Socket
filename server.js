const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

// Tạo server HTTP
const server = http.createServer((req, res) => {
  fs.readFile(__dirname + '/index.html', (err, data) => {
    res.writeHead(200);
    res.end(data);
  });
});

// Kết nối Socket.io với server HTTP
const io = socketio(server);

// Xử lý các sự kiện kết nối và chat
io.on('connection', (socket) => {
  console.log('A user connected');

  // Lắng nghe sự kiện chat
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg); // Gửi lại tin nhắn cho tất cả các kết nối
  });

  // Lắng nghe sự kiện ngắt kết nối
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Khởi động server và lắng nghe trên cổng 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});
