

var net = require('net');
var color = require('colors');
var chatServer = net.createServer();

var clients = [];

chatServer.on('connection', (client) => {
	client.setEncoding('utf-8');
	client.name = client.remotePort;
	clients.push(client);
	var joinMsg = client.name+' just join in the chat room!';
	console.log(joinMsg.red);
	client.write('You have joined in the chat room, you name is '+client.name);
	
	client.on('data',(data) => {
		var chatMsg = client.name+' said: ' + data;
        console.log(chatMsg.yellow);
        broadcast(data,client);
    });

    client.on('end',() => {
    	;
    	var msg = client.name+' has left the chat room.';
    	broadcast(msg);
    });

    client.on('error',() => {
    	var leftMsg = client.name+' just left the chat room.';
    	console.log(leftMsg.blue);
    	remove(client)
    	var msg = client.name+' has left the chat room.';
    	broadcast(msg);
    });
});

function broadcast(msg,sender) {
	clients.forEach(function(element) {
		if(element === sender)
			return;
		if(sender === undefined)
			element.write('Server said: '+msg);
		else{
			element.write(sender.name+' said: '+msg);
		}		
	});
}

function remove(client) {
	clients.splice(clients.indexOf(client),1);
}

chatServer.listen(8080,() => {
	console.log('listen to 8080');
});
