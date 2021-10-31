"use strict";

const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((req, res) => { // Create an HTTP server
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
server.on('upgrade', (req, socket, head) => {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');
  socket.pipe(socket); // echo back
});

server.listen(3001, '127.0.0.1', () => {
  const options = { // make a request
    port: 3001,
    host: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };

  const req = http.request(options);
  let file = "/Users/cco/Github/ecies-rest/static/";
  let writeStream = fs.createWriteStream(path.join(file + "hello.txt")); 
  req.on('upgrade', function (res, socket, upgradeHead){    
    writeStream.write('my hello world' + Date.now(), 'utf-8'); // write some data with a base64 encoding
    writeStream.end();
    writeStream.on('finish', () => {
      console.log('wrote all data to file'); // finish event emitted when all data has been flushed from the stream
    });
    socket.end();
    process.exit(0);
  });

  req.end();
});