var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server, {});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/client/index.html");
});
app.use(express.static('client'));
server.listen(80);
console.log("Server Up and Running on Port 80");


var SOCKET_LIST = {};
var PLAYER_LIST = {};

var Player = function(id){
    var self = {
        x:0,
        y:0,
        id:id,
        pressingRight:false,
        pressingLeft:false,
        pressingUp:false,
        pressingDown:false,
        maxSpd:10,
    };
    self.updatePosition = function(){
        if (self.pressingRight)
            self.x += self.maxSpd;
        if (self.pressingLeft)
            self.x -= self.maxSpd;
        if (self.pressingUp)
            self.y -= self.maxSpd;
        if (self.pressingDown)
            self.y += self.maxSpd;
    }
    return self;
}



io.on('connection', function(socket) {
    socket.id = Math.floor(10* Math.random())
    SOCKET_LIST[socket.id] = socket;

    var player = Player(socket.id);

    socket.emit("yeniKullanici",player);

    PLAYER_LIST[socket.id]=player;

    socket.on("disconnect",function(){
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });

    socket.on("keyPress",function(data){
        //console.log(data.inputId+" "+data.state);
        if (data.inputId==="right") {
            player.pressingRight = data.state;
        }else if (data.inputId==="left") {
            player.pressingLeft = data.state;
        }else if (data.inputId==="up") {
            player.pressingUp = data.state;
        }else if (data.inputId==="down") {
            player.pressingDown = data.state;
        }
    });

    
});

setInterval(function() {
    var kullanici_paket = [];
    for (var i in PLAYER_LIST) {
        var player = PLAYER_LIST[i];
        player.updatePosition();
        kullanici_paket.push({
            id:player.id,
            x: player.x,
            y: player.y
        });
    }for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit("yeniKoordinatlar", kullanici_paket);
    }



    

}, 1000 / 25);