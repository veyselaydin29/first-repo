
Game.Preloader = function(){
	this.preloadBar = null;
};

Game.Preloader.prototype = {
	preload:function(){
		console.log("Stage Preloader");
		this.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY,"loadingBar");
		this.preloadBar.anchor.setTo(0.5);
		this.time.advancedTiming = true;
		this.load.setPreloadSprite(this.preloadBar);


		game.load.image("player", "assets/sprites/playermale.png");
        game.load.tilemap("harita", "assets/tilemap/harita.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("tilesheet", "assets/tilemap/tilesheet.png");


	},
	create:function(){
		
		this.state.start("Login");
	}
};
var login = function() {

	var client = document.createElement("script");
		client.src = "js/client.js";
		document.head.appendChild(client);

	/*function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function demo() {
		console.log('Taking a break...');
		await sleep(5000);
		console.log('Five second later');
	}

	demo();*/

	
}