// FOR WEBSOCKET
const http = require('http')
const WebSocket = require('ws');
const { WebSocketServer } = require('ws')
const { randomUUID } = require('crypto');
const clients = new Map(); // has to be a Map instead of {} due to non-string keys
const server = http.createServer()
const PORT = 6886
const wss = new WebSocketServer({server}); // initiate a new server that listens on port 8080
const url = require('url')
// set up event handlers and do other things upon a client connecting to the server
wss.on('connection', (connection, request) => {
  // create an id to track the client
  const { username } = url.parse(request.url, true).query
  // console.log(username)

  const uiid = randomUUID();
  clients.set(connection, uiid);
  console.log(`new connection assigned id: ${uiid}`);

  // send a message to all connected clients upon receiving a message from one of the connected clients
  connection.on('message', (msg) => {
    try {
       const data = JSON.parse(msg); 
       console.log("data",data)
    } catch (error) {
      
    }
    console.log(`received: ${data}`);
    serverBroadcast(`Client ${clients.get(connection)} ${data}`);
  });

  // stop tracking the client upon that client closing the connection
  connection.on('close', () => {
    console.log(`connection (id = ${clients.get(connection)}) closed`);
    clients.delete(connection);
  });

  // send the id back to the newly connected client
  connection.send(`You have been assigned id ${uiid}`);
});

// send a message to all the connected clients about how many of them there are every 15 seconds
setInterval(() => {
  console.log(`Number of connected clients: ${clients.size}`);
  serverBroadcast(`Number of connected clients: ${clients.size}`);
}, 15000);

// function for sending a message to every connected client
const serverBroadcast = (message) => {
  wss.clients.forEach((wclient) => {
    if (wclient.readyState === WebSocket.OPEN) {
      wclient.send(message);
    }
  });
}
server.listen(PORT, () => {
  console.log("🟢 Websocket is running PORT " + PORT)
})
// END FOR SOCKET


module.exports = {
  get clients() { return clients; },
  get wss() { return wss },
  serverBroadcast
};
