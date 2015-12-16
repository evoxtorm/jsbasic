

var net = require('net');

var chatServer = net.createServer();

var clients = [];

chatServer.on('connection', (client) => {
	client.setEncoding('utf-8');
	client.name = client.remotePort;
	clients.push(client);

	console.log(client.name+' just join in the chat room!\n');
	client.write('You have joined in the chat room, you name is '+client.name);
	
	client.on('data', (data) => {
        console.log(client.name+' said: ' + data);
        broadcast(data,client);
    });

    client.on('end',() => {
    	remove(client);
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
