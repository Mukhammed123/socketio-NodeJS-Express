const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "http://localhost:8080" }})

server.listen(3000, () => {
  console.log("Listening...");
})

io.on('connection', (socket) => {

  console.log("User connected: ",socket.id);

  socket.on('join room one', () => {

    socket.join('room-one');
    console.log("Join the room")

    socket.on('room one message', (data) => { 
      socket.broadcast.to('room-one').emit('message', data)
    });
  });

  socket.on('clients in room one', async () => {
    const clients = await io.in('room-one').fetchSockets()
    console.log(clients);
  })
});
