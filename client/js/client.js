console.log("Stage Client");
var Client = {};
Client.socket = io.connect();

Client.socket.on('connect', function() {

    Client.socket.emit('info', {
        username: username,
        password: password
    });
});

Client.socket.on("girisBasarili", function(data) {
    if (data.username == username) {
        game.state.start("gameState");
    }
});

Client.socket.on("yeniKullanici", function(data) {
    
    playerSocketId=data.socketid;
    playerUserId = data.userid;
    playerX = data.x;
    playerY = data.y;
    //console.log(data);

});

Client.socket.on("yeniKoordinatlar", function(data) {

    for (var i = 0; i < data.length; i++) {
        if (typeof(playerMap[data[i].socketid]) == "undefined") {
            playerMap[data[i].socketid] = game.add.sprite(data[i].x, data[i].y, 'player');
            console.log("Kullanıcı ekrana çizildi");
        }
        playerMap[data[i].socketid].x = data[i].x;
        playerMap[data[i].socketid].y = data[i].y;
        playerMap[data[i].socketid].userid = data[i].userid;
    }

});


Client.socket.on("mesaj", function(data) {
    console.log(data);
});

Client.socket.on("userDisconnected", function(sid) {
    delete playerMap[sid];
});

var updatePos = function(){
    Client.socket.emit("updatePos",{
        socketid:playerSocketId,
        x:player.x,
        y:player.y
    })
};