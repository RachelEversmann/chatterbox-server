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
  results: [{
    username: 'Robert',
    roomname: 'lobby',
    text: 'Hi, I am awesome',
    objectId: 5
  }]
};

var urls = ['/classes/messages', '/classes/room', '/messages/rooms'];

var requestHandler = function(request, response) {

  var headers = {};
  headers['Content-Type'] = 'text/plain';
  headers = defaultCorsHeaders;

  if (urls.indexOf(request.url) === -1) {
    response.writeHead(404, headers);
    //console.log("^^^^^^^^^^^^^^^^^^^^^^^^ error ", request.url);
    response.end();
  } else if (request.method === 'POST') {
    //console.log('in post');
    request.on('data', (info) => {
      var message = info.toString();
      var obj = {};
      message.split('&').forEach(function(group) {
        var kv = group.split('=');
        obj[kv[0]] = kv[1];
      });
      obj.objectId = data.results.length;
    //  console.log("info",obj);
      data.results.push(obj);
    });
    response.writeHead(201, headers);
    response.end(JSON.stringify(data));

  } else if (request.method === 'GET') {
  //  console.log('in get \n',data);
    response.writeHead(200, headers);
    response.end(JSON.stringify(data));

  } else if (request.method === 'OPTIONS') {
  //  console.log('in optioins');
    response.writeHead(200, headers);
    response.end();

  } else {
  //  console.log("#####################", request.method);
  }
};


exports.requestHandler = requestHandler;
