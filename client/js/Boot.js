
var Game = {};
Game.Boot = function(game){};
Game.Boot.prototype = {
	preload:function(){
		console.log("Stage Boot");
		this.load.image("loadingBar","assets/sprites/loadingBar.png")
	},
	create:function(){
		this.state.start("Preloader");

	}
};