const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('alarm', (msg) => {
    console.log('blast alarm: ' + msg);
  });
});

const PORT = process.env.PORT || 5006;

http.listen(PORT, () => {
  console.log(`App connected on port ${PORT}`);
});
