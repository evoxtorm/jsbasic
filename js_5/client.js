
var net = require('net');
var color = require('colors');
var client = new net.Socket();
client.setEncoding('utf8');
process.stdin.setEncoding('utf8');


client.connect(8080, () => {
	console.log('Connected!\n'.rainbow);	
});

process.stdin.pipe(client);  // user input

client.on('data', function(data) {   	
    console.log(data.red);   
});

