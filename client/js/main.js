

var boyutX = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var boyutY = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var game = new Phaser.Game(boyutX,boyutY, Phaser.CANVAS);
game.state.add("gamestate",chat.gamestate);
game.state.start("gamestate")