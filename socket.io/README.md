# Socket.IO

Socket.IO is composed of two parts:

- A server that integrates with (or mounts on) the Node.JS HTTP Server (the socket.io package)
- A client library that loads on the browser side (the socket.io-client package)

1. `socket.on(eventName, callback)`
   - This method is used to listen for incoming events from the client.
   - It registers a new event handler for the specified event name.
   - When the event is emitted from the client, the callback function is executed.
   - Example: `socket.on('chat message', (msg) => {  console.log('Message received: ' + msg);  });`
2. `socket.emit(eventName, ...args)`
   - This method emits an event to the specific socket it is called on.
   - It's used for sending a message to a single client.
   - Example: `socket.emit('welcome', 'Welcome to the chat!');`
3. `socket.join(room)`
   - This method adds the socket to the specified room.
   - It's used for grouping sockets, allowing for room-based broadcasting.
   - Example: `socket.join('chat room');`
4. `socket.to(room).emit(eventName, ...args)`
   - This method emits an event to all sockets in a specific room, except the sender.
   - It's used for targeted broadcasting within a room.
   - Example: `socket.to('game room').emit('player joined', playerName);`
5. `socket.broadcast.emit(eventName, ...args)`
   - This method emits an event to all connected sockets except the sender.
   - It's used for broadcasting a message to everyone else.
   - Example: `socket.broadcast.emit('user connected', 'A new user has joined the chat');`
