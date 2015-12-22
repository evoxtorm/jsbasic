

var net = require('net');
var chatServer = net.createServer();
var clients = [];

chatServer.on('connection', (client) => {
    client.setEncoding('utf-8');
    client.name = client.remotePort;
    clients.push(client);
    var curTime = getTime();
    var joinMsg = curTime + ' ' + client.name + ' just join in the chat room!';
    console.log(joinMsg);
    client.write(curTime + ' You have joined in the chat room, you name is ' + client.name);

    client.on('data',(data) => {
        data = data.slice(0,-2).toLowerCase();// remove the \n at the end of the data
        var curTime = getTime();
        var changeNameTag = data.slice(0,6);

        if(data === '/list'){
            var clientsName = '';
            clients.forEach(function(element) {
                clientsName += ' ' + element.name;
            });
            client.write(clientsName);
        }
        else if(data === '/ping') {
            client.write('PONG');
        }
        else if(changeNameTag === '/name ') {
            client.name = data.slice(6);    
        }
        else if(data === '/quit') {
            client.end();
        }
        else{
            var chatMsg = curTime + ' ' + client.name + ' : ' + data;
            console.log(chatMsg);
            broadcast(chatMsg);
        }    
    });

    client.on('error',() => {
        console.log('in error');
        clientLeft(client);
    });

    client.on('end', () => {
        console.log('in end');
        clientLeft(client);
    });
});

function clientLeft(client) {
    var curTime = getTime();
    var leftMessage = curTime + ' ' + client.name + ' just left the chat room.';
    console.log(leftMessage);
    remove(client)
    broadcast(leftMessage);
}

function broadcast(message) {
    clients.forEach(function(element) {
        element.write(message);
    });
}

function remove(client) {
    clients.splice(clients.indexOf(client),1);
}

function getTime() {
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var curTime = '['+hour+':'+minute+':'+second+']';
    return curTime;
}

chatServer.listen(8080,() => {
    console.log('listen to 8080');
});
