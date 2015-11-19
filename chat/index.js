//intializes app to be a function handler that you can supply an HTTP server
var app = require('express')(); 
var http = require('http').Server(app);

var io = require('socket.io')(http);

//route handler
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//on connection
io.on('connection', function(socket){
	console.log('New User Has Entered Chat!')
	io.emit('chat message', 'New User Has Entered Chat!')
	//alerts when user dissconnects
	socket.on('disconnect', function(){
		//on dissconnect broadcast to everyone user has left
		io.emit('chat message', 'A User Has Left Chat!')
		//on dissconnect shows user disconnect in console
		console.log('A User Has Disconnected.')
	});
	//chat message event
	socket.on('chat message', function(msg){
    	//broadcast message to everyone on server
    	io.emit('chat message', msg);
  	});
});

//make http server listen on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
