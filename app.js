// Conflict between express.js 3.x and socket.io: 
// var express = require('express');
// var expressApp = express();
//
// var app = require('http').createServer(expressApp)
//    ,io = require('socket.io').listen(app)
//
// wrap an another object to work-around
// 
//
// external packages:
// socket.server
// cluster.io => graphically show benchmark(presure testing) of socket.io on current server

var app = require('http').createServer(handler)
,io = require('socket.io').listen(app)
,fs = require('fs');

app.listen(3333);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
            function (err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                }
                res.writeHead(200);
                res.end(data);
            });
}

// trigger event when 
io.sockets.on('connection', function (socket) {
    console.log('User ' + socket.id + ' connected!');

    // socket.io configuration
    io.configure(fucntion() {
        // set data into socalled 'handshake' 
        io.set('authorization', function(handshakeData) {
            handshakeData.hello = 'word';
            callback(null, true); // error first callback
        })
    });
    // if client trigger say event to server, server proxy the message to other user.
    socket.on('say', function(data) {
        // retrieve previos setted cookie data
        console.log(sockets.handshake.hello);

        io.sockets.emit('sayHandler', {
            id: socket.id,
            text: data.text
        });
    });
});

