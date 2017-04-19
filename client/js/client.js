var Client = {};
Client.socket = io.connect();


Client.socket.on("yeniKoordinatlar", function(data) {
    
    for (var i = 0; i < data.length; i++) {
        playerMap[data[i].id].x = data[i].x;
        playerMap[data[i].id].y = data[i].y;
        console.log(data[i].id);
    }
    
});

Client.socket.on("yeniKullanici",function(data){
    //console.log(data);
    playerMap[data.id] = game.add.sprite(data.x,data.y,'player');
})

var birTusDown = function(key){
    Client.socket.emit('keyPress',{inputId:key,state:true});
}
var birTusUp = function(key){
    Client.socket.emit('keyPress',{inputId:key,state:false});
}