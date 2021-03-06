/* Import node's http module: */
var http = require('http');
var handleRequest = require('./request-handler.js');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = '127.0.0.1';

var _DIR = `${process.cwd()}/server/client/client/`;
// var sample = {
//   results: [
//     {
//       username: 'Robert',
//       roomname: 'lobby',
//       text: 'Not as awesome as I thought...',
//       objectId: 1
//     }
//   ]
// }
//
// fs.writeFile('./server/html/data.js', JSON.stringify(sample), 'utf-8', function() {
//   console.log('Sample File Written');
// });

// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
//var server = http.createServer(handleRequest.requestHandler);
//console.log('Listening on http://' + ip + ':' + port);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  (req.method === 'OPTIONS') ? res.status(200) : next();
});

app.use('/',express.static('server/client/client'));

app.get('/', function (req, res) {
  res.sendFile('/index.html');
});

app.get('/classes/messages', function (req, res) {
  fs.readFile('./server/html/data.js', function (error, data) {
    var newData = JSON.parse(data.toString());
    res.status(200).send(JSON.stringify(newData));
  });
});

app.post('/classes/room', function (req, res) {
  var oldObj = {};
  fs.readFile('./server/html/data.js', function (error, data) {
    oldObj = JSON.parse(data.toString());
    var newObj = req.body;
    newObj.objectId = oldObj.results.length;
    oldObj.results.push(newObj);
    fs.writeFile('./server/html/data.js', JSON.stringify(oldObj), 'utf-8');
    res.send('done');
  });
});
app.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.


// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
