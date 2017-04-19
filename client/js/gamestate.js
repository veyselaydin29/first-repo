var chat = {},
    playerMap = {},
    speed = 200,
    cursors, map;
var border, tree, ev, yeralti;

chat.gamestate = function() {};
chat.gamestate.prototype = {
    preload: function() {
        game.load.image("player", "assets/sprites/playermale.png");
        game.load.tilemap("harita", "assets/tilemap/harita.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("tilesheet", "assets/tilemap/tilesheet.png");

    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 2400, 2400);
        game.stage.backgroundColor = "#808080";
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        map = game.add.tilemap("harita");
        map.addTilesetImage("tilesheet");


        var water = map.createLayer("water");
        var ground = map.createLayer("ground");
        border = map.createLayer("border");

        ev = map.createLayer("ev");
        var yol = map.createLayer("yol");
        yeralti = map.createLayer("yeralti");

        map.setCollisionBetween(931, 933, true, "border");
        map.setCollisionBetween(937, 940, true, "border");
        map.setCollisionBetween(951, 953, true, "border");
        map.setCollisionBetween(957, 960, true, "border");
        map.setCollisionBetween(971, 973, true, "border");
        map.setCollisionBetween(978, 980, true, "border");
        map.setCollisionBetween(1011, 1012, true, "border");
        map.setCollisionBetween(1019, 1020, true, "border");
        map.setCollisionBetween(1031, 1033, true, "border");
        map.setCollisionBetween(1038, 1040, true, "border");
        map.setCollisionBetween(1051, 1060, true, "border");
        map.setCollisionBetween(1071, 1080, true, "border");
        map.setCollisionBetween(1091, 1100, true, "border");


        map.setCollisionBetween(205, 209, true, "ev");
        map.setCollisionBetween(225, 229, true, "ev");
        map.setCollisionBetween(245, 249, true, "ev");
        map.setCollisionBetween(265, 269, true, "ev");
        map.setCollisionBetween(285, 289, true, "ev");
        map.setCollisionBetween(305, 309, true, "ev");
        map.setCollisionBetween(325, 329, true, "ev");
        map.setCollisionBetween(345, 349, true, "ev");
        map.setCollisionBetween(365, 369, true, "ev");

        map.setCollisionBetween(1854, 1854, true, "yeralti");



        tree = map.createLayer("tree");
        map.setCollisionBetween(294, 295, true, "tree");


        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function() {
        //game.physics.arcade.collide(player, border);
        //game.physics.arcade.collide(player, tree);
        //game.physics.arcade.collide(player, ev);
        //game.physics.arcade.collide(player, yeralti);

        if (cursors.right.isDown) {
            birTusDown("right");
        }else if (cursors.right.isUp) {
            birTusUp("right");
        }
        if (cursors.left.isDown) {
            birTusDown("left");
        }else if (cursors.left.isUp) {
            birTusUp("left");
        }
        if (cursors.up.isDown) {
            birTusDown("up");
        }else if (cursors.up.isUp) {
            birTusUp("up");
        }
        if (cursors.down.isDown) {
            birTusDown("down");
        }else if (cursors.down.isUp) {
            birTusUp("down");
        }


    },
    render: function() {

    }
};
//mrb