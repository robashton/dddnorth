var http = require('http');
var paperboy = require('paperboy');
var path = require('path');


ROOT = path.dirname(__filename) + '/Slides';

var app = http.createServer(function (req, res) {
	
	paperboy
	    .deliver(ROOT, req, res)
	    .addHeader('Expires', 300)
	    .addHeader('X-PaperRoute', 'Node');

});


io = require('socket.io').listen(app);
app.listen(1220, "127.0.0.1");

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('switch', function (data) {
   	socket.broadcast.emit('switch', data);
  });
});