var cursors, map, speed = 250;
var border, tree, ev, yeralti;

Game.gameState = function(game) {};
Game.gameState.prototype = {
	preload: function() {

	},
	create: function() {
		console.log("Stage gameState");

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



		/*if (map.objects.GameObjects) {
			const playerstartpos = map.objects.GameObjects;
			playerstartpos.forEach(bumper => {
				player = game.add.sprite(playerstartpos[0].x + 16, playerstartpos[0].y + 16, "player");
			});
		}*/

		player = game.add.sprite(playerX, playerY, "player");

		console.log("Kullanıcı ekrana çizildi");
		player.anchor.setTo(0.5);
		game.physics.enable(player);
		player.body.collideWorldBounds = true;
		game.camera.follow(player);
		game.world.bringToTop(player);


		tree = map.createLayer("tree");
		map.setCollisionBetween(294, 295, true, "tree");



		cursors = game.input.keyboard.createCursorKeys();


	},
	update: function() {
		game.physics.arcade.collide(player, border);
		game.physics.arcade.collide(player, tree);
		game.physics.arcade.collide(player, ev);
		game.physics.arcade.collide(player, yeralti);

		if (cursors.right.isDown) {
			player.body.velocity.x = speed;
			updatePos();
			player.scale.setTo(1, 1);
		} else if (cursors.left.isDown) {
			player.body.velocity.x = -speed;
			updatePos();
			player.scale.setTo(-1, 1);
		} else {
			player.body.velocity.x = 0;
			updatePos();
		}
		if (cursors.up.isDown) {
			player.body.velocity.y = -speed;
			updatePos();
		} else if (cursors.down.isDown) {

			player.body.velocity.y = speed;
			updatePos();
		} else {
			player.body.velocity.y = 0;
			updatePos();
		}



	},
	render: function() {}
};