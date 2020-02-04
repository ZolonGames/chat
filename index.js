var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
var messages = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('chat message', messages);
    socket.on('disconnect', function(){
        console.log('user disconnected');
        });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg.text);
        messages.unshift(msg);
        if (messages.length > 25)
        {
            messages.pop();
        }
        io.emit('chat message', messages);
    });
})

http.listen(PORT,function(){
    console.log('listening on ' + PORT);
});
