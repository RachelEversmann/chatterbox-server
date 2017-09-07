/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.




// var fs = require('fs');
// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };
//
// var urls = ['/classes/messages', '/classes/room', '/messages/rooms', '/test'];
//
// var requestHandler = function(request, response) {
//
//   var headers = {};
//   headers['Content-Type'] = 'text/plain';
//   headers = defaultCorsHeaders;
//
//   if (urls.indexOf(request.url) === -1) {
//     response.writeHead(404, headers);
//     //console.log("^^^^^^^^^^^^^^^^^^^^^^^^ error ", request.url);
//     response.end();
//   } else if (request.url === '/test') {
//     fs.readFile('./server/html/data.js', function (error, data) {
//       var newData = JSON.parse(data.toString());
//       response.writeHead(200, { 'Content-Type' : 'text/html'});
//       response.end(data);
//     });
//   } else if (request.method === 'POST') {
//     request.on('data', (info) => {
//       var message = info.toString();
//       var obj = {};
//
//       fs.readFile('./server/html/data.js', function (error, data) {
//         obj = JSON.parse(data.toString());
//         var newResult = {};
//         message.split('&').forEach(function(group) {
//           var kv = group.split('=');
//           newResult[kv[0]] = decodeURIComponent(kv[1]).replace('+', ' ');
//         });
//
//         newResult.objectId = obj.results.length;
//         obj.results.push(newResult);
//         fs.writeFile('./server/html/data.js', JSON.stringify(obj), 'utf-8', function() {
//         } );
//       });
//
//     });
//     response.writeHead(201, headers);
//     response.end(JSON.stringify(data));
//
//   } else if (request.method === 'GET') {
//     fs.readFile('./server/html/data.js', function (error, data) {
//       var newData = JSON.parse(data.toString());
//       response.writeHead(200, headers);
//       response.end(JSON.stringify(newData));
//     });
//
//   } else if (request.method === 'OPTIONS') {
//     response.writeHead(200, headers);
//     response.end();
//
//   } else {
//     console.log("What???");
//   }
//
//   return;
// };
//
//
// exports.requestHandler = requestHandler;
