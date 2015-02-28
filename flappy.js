// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = -4;
var label_score;
var player;
var pipes;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "assets/Super_Twitter.png");
    game.load.image("playerImg1", "assets/running_chicken.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("pipe", "assets/pipe_blue.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.add.text(70, 40, "Better call Bird!",
        {font: "40px Arial black", fill: "#0099FF"});
    game.stage.setBackgroundColor("#FFFFD6");

    game.add.sprite(430, 40, "playerImg");
    //game.add.sprite(650,30,"playerImg1")

    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    pipes = game.add.group();


    label_score = game.add.text(730, 350, "0",
        {font: "35px Arial black", fill: "#B20000"});
    player = game.add.sprite(15, 200, "playerImg");

    generate_pipe();
    var pipe_interval = 1.75;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.velocity.y = -100;
    player.body.gravity.y = 400;

    changeScore();



}


    /*
     * This function updates the scene. It is called for every new frame.
     */
    function update() {

        game.physics.arcade.overlap(player, pipes, game_over);

    }

    function clickHandler(event) {
        game.add.sprite(event.x - 1, event.y - 1);
        changeScore();
    }

    function moveRight() {
        player.x = player.x + 6
    }

    function moveLeft() {
        player.x = player.x - 6
    }

    function moveUp() {
        player.y = player.y - 6
    }

    function moveDown() {
        player.y = player.y + 6
    }

function changeScore(){
    score = score + 1;
    label_score.setText(score.toString());

}
function generate_pipe(){
    var gap = game.rnd.integerInRange(1, 5);
    for (var count = 0; count < 8; count++){
        if(count !=gap && count != gap+1)
            add_pipe_block(600, count * 50);
    }
    changeScore();
}

function add_pipe_block(x,y) {
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -100;

}

function player_jump(){
    player.body.velocity.y = -125;
}

function game_over(){
    score =-4;
    game.state.restart();
}