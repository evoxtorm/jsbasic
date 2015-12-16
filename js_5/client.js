
var net = require('net');
var client = new net.Socket();
client.setEncoding('utf8');
process.stdin.setEncoding('utf8');


client.connect(8080, () => {
	console.log('Connected!\n');	
});

process.stdin.pipe(client);
/*
process.stdin.on('readable', () => {
	var clientInput = process.stdin.read();
	if(clientInput !== null)
		client.write(clientInput);
});
*/

client.on('data', function(data) {   	
    console.log(data);   
});

