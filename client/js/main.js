var boyutX = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var boyutY = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var game = new Phaser.Game(boyutX,boyutY, Phaser.CANVAS);

game.state.add("Boot",Game.Boot);
game.state.add("Preloader",Game.Preloader);
game.state.add("Login",Game.Login);
game.state.add("gameState",Game.gameState);
game.state.start("Boot")