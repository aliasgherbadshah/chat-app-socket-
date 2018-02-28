var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var clientInfo = {};

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('user is connected via socket.io')

	socket.on('joinRoom', function(req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',{
			name:'system',
			text:req.name + 'has join',
			timestamp:moment.valueOf()
		})
	})


    
    socket.on('message',function(message){
        console.log('message received ' + message.text);
        message.timestamp = moment().valueOf()
        io.to(clientInfo[socket.id].room).emit('message', message);
    })
    
    
    
    
    socket.emit('message', {
        text: 'welcome to the chate application',
        timestamp: moment().valueOf(),
        name: 'system'
    })
})



http.listen(PORT, function(){
	console.log("server is stated !!!!!!!")
})