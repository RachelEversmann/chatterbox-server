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
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var data = {
  results: []
};

var urls = ['/classes/messages', '/classes/room'];

var requestHandler = function(request, response) {

  var headers = {};
  headers['Content-Type'] = 'text/plain';
  if (urls.indexOf(request.url) === -1) {
    response.writeHead(404, headers);
    response.end();
  } else if (request.method === 'POST') {
    request.on('data', (info) => {
      data.results.push(JSON.parse(info));
    });
    headers = defaultCorsHeaders;
    response.writeHead(201, headers);
    response.end(JSON.stringify(data));
  } else if (request.method === 'GET') {
    headers = defaultCorsHeaders;
    response.writeHead(200, headers);
    response.end(JSON.stringify(data));
  }
};


exports.requestHandler = requestHandler;
