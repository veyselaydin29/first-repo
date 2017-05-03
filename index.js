var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server, {});
var mysql = require("mysql");

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatapp"
});
conn.connect(function(err) {
    if (err) {
        console.error('Database bağlantısı sağlanılamadı!');
        return;
    }
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/client/index.html");
});
app.use(express.static('client'));
server.listen(80);
console.log("Server Up and Running on Port 80");


var SOCKET_LIST = {};
var PLAYER_LIST = {};
var player;
var count = 1;
var Player = function(socketid, userid, x, y) {
    var self = {
        x: x,
        y: x,
        socketid: socketid,
        userid: userid
    };
    return self;
}

var userDisconnected = function(sid) {
    io.emit("userDisconnected", sid);
};

var mesaj = function(msg) {
    io.emit("mesaj", msg)
}
var girisBasarili = function(username) {
    io.emit("girisBasarili", username);
}


io.on('connection', function(socket) {
    socket.on('info', function(data) {
        if (typeof data.username == "undefined") {
            mesaj("Lütfen kullanıcı adınızı giriniz!");
        } else if (typeof data.password == "undefined") {
            mesaj("Lütfen şifrenizi giriniz!");
        } else {
            var loginQuery = "select * from users where username =" + conn.escape(data.username) + " AND password =" + conn.escape(data.password) + "";
            conn.query(loginQuery, function(err, result) {
                if (typeof result[0] !== "undefined") {
                    mesaj("Giriş Başarılı");
                    console.log(result[0].username + " giriş yaptı!");

                    if (io.sockets.connected[socket.id]) {
                        io.sockets.connected[socket.id].emit('girisBasarili', data);
                    }
                    SOCKET_LIST[socket.id] = socket;
                    player = Player(socket.id, result[0].id, result[0].lastX, result[0].lastY);
                    socket.emit("yeniKullanici", player);
                    PLAYER_LIST[socket.id] = player;
                    count++;

                } else {
                    mesaj("Kullanıcı bilgileriniz hatalı.");
                }
            });
        }

    });

    socket.on("updatePos", function(data) {
        PLAYER_LIST[data.socketid].x = data.x;
        PLAYER_LIST[data.socketid].y = data.y;
    });

    socket.on("disconnect", function() {
        userDisconnected(socket.id);
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];

    });


});

setInterval(function() {
    var kullanici_paket = [];
    for (var i in PLAYER_LIST) {
        var player = PLAYER_LIST[i];


        kullanici_paket.push({
            socketid: player.socketid,
            x: player.x,
            y: player.y,
            userid: player.userid
        });


    }
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit("yeniKoordinatlar", kullanici_paket);
    }



}, 1000 / 25);