var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

// global variabels
var clientInfo = {};

//----functions-------

 function sendUserName (socket){
	var info = clientInfo[socket.id];
	var users = [];

	if (typeof info === 'undefined') {
		return;
	}
	Object.keys(clientInfo).forEach(function(socketId){
		var userInfo = clientInfo[socketId];

		if(info.room === userInfo.room){
			users.push(userInfo.name)
		}

	});

	socket.emit('message',{
		name:'system',
		text:'Current users: '+users.join(', '),
		timestamp:moment.valueOf()
	})
}






app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('user is connected via socket.io')

	socket.on('disconnect',function(){
		var userData = clientInfo[socket.id];
		if (typeof userData !== 'undefined') {
			socket.leave(userData.room);
			io.to(userData.room).emit('message',{
				name:'system',
				text:userData.name+ " hase left",
				timestamp:moment.valueOf()
			});
			delete clientInfo[socket.id];
		}
	})

	socket.on('joinRoom', function(req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',{
			name:'system',
			text:req.name + ' has join',
			timestamp:moment.valueOf()
		})
	})


    
    socket.on('message',function(message){
        console.log('message received ' + message.text);

        if(message.text === '@list'){
        	sendUserName(socket);
        }else{
        	message.timestamp = moment().valueOf()
        	io.to(clientInfo[socket.id].room).emit('message', message);
        }

        
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