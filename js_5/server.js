var net = require('net');
var colors = require('colors');
var chatServer = net.createServer();
var clients = [];

chatServer.on('connection', (client) => {
    initialNewClient(client);
    showMessageInServer(client);
    console.log(colors['red']('what'));
    
    client.on('data',(data) => {       
        if(isCommand(data))
            processCommand(processData(data),client);     
        else 
            showMessageInClients(client,data); 
    });

    client.on('error',() => {
        onLeft(client);
    });

    client.on('end', () => {
        onLeft(client);
    });
});

var commandMap = {
    list : onList,
    ping : onPing,
    name : onChangeName,
    quit : onQuit,
    color : onColor
}

function initialNewClient(client) {
    client.setEncoding('utf-8');
    client.name = client.remotePort;
    client.color = 'grey';
    clients.push(client);
}

function onPing(command,client) {
    client.write('PONG');
}

function onList(command,client) {
    var clientsName = '';
    clients.forEach(function(element) {
        clientsName += ' ' + element.name;
    });
    client.write(clientsName);
}

function onChangeName(command,client) {
    client.name = command.content[0];
}

function onQuit(command,client) {
    client.end();
}

function onColor(command,client) {
    var userInputColor = command.content[0];
    if(colors[userInputColor] === undefined) {
        client.write('no such color');
    }
    else {
        client.color = userInputColor;
    }   
}

function processCommand(command,client) {
    var commandMatch = commandMap[command.tag];
    if(commandMatch)
        commandMatch(command,client);
    else 
        client.write('no such command');
}

function showMessageInServer(client) {
    var curTime = getTime();
    var joinMsg = curTime + ' ' + client.name + ' just join in the chat room!';
    console.log(joinMsg);
    client.write(curTime + ' You have joined in the chat room, you name is ' + client.name);
}

function showMessageInClients(client,data) {
    var curTime = getTime();
    var chatMsg = curTime + ' ' + client.name + ' : ' + data;
    console.log(chatMsg);
    broadcast(chatMsg,client.color);
}

function processData(data) {
    var commands = data.substring(1).trim().toLowerCase().split(' ');
    var commandTag = commands.shift()
    return {
        tag:commandTag,
        content:commands
    };
}

function isCommand(input) {
    return input.substring(0,1) === '/';
}

function onLeft(client) {
    var curTime = getTime();
    var leftMessage = curTime + ' ' + client.name + ' just left the chat room.';
    console.log(leftMessage);
    remove(client)
    broadcast(leftMessage);
}

function broadcast(message,color) {
    clients.forEach(function(element) {
        element.write(colors[color](message));
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
