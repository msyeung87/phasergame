(function(){

var game = new Phaser.Game('100%', '100%', Phaser.CANVAS, 'gameContainer', {preload: preload, create: create, update: update, render: render });


function preload() {

    game.load.image('sky', 'assets/skybackground.jpg');
	game.load.image('player', 'assets/macbook.png');
	game.load.image('syntax', 'assets/syntaxerror.png');

}

var background;
var player;
var syntax;
var cursors;
var timer;
var total = 0;
var spaceBar;


function create() {
	// background
    // background = game.add.image(0, 0, 'sky');
    // background.scale.setTo(2);

    background = game.add.tileSprite(0, 0, 1280, 720, 'sky');
        background.autoScroll(-25, 0);
        background.scale.setTo(2);

	//	Enable p2 physics and arcade
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Make things a bit more bouncey
    game.physics.p2.defaultRestitution = 0.8;

    //  Add sprites
	player = game.add.sprite(100, 300, 'player');
	player.scale.setTo(0.3);
	player.enableBody = true;
	
	// syntax = game.add.sprite('syntax');


	// game.add.physicsGroup(syntax);
	stuff = game.add.physicsGroup();
    var y = 80;

    for (var i = 0; i < 15; i++)
    {
        var syntax = stuff.create(game.world.randomX, y, 'syntax');
        syntax.body.velocity.x = game.rnd.between(-10, -100);
        syntax.scale.setTo(0.7);
        syntax.enableBody = true;
        y += 48;
    }

    //  Enable if for physics. This creates a default rectangular body.
	game.physics.p2.enable(player);
	game.physics.p2.enable(syntax);
	game.physics.enable(player, Phaser.Physics.ARCADE);
	game.physics.enable(syntax, Phaser.Physics.ARCADE);


    //  Modify a few body properties
	// sprite.body.setZeroDamping();
	player.body.fixedRotation = true;

    // text = game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });

    cursors = game.input.keyboard.createCursorKeys();
    spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    //  Create our Timer
    timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(1000, updateCounter, this);
    timer.start();

}

function update() {
	stuff.forEach(checkPos, this);

    game.physics.arcade.overlap(player, syntax, collisionHandler, null, this);
    game.physics.arcade.collide(player, syntax);
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

	// player.body.setZeroVelocity();


    if (cursors.left.isDown)
    {
    	// sprite.scale.setTo(-0.3, 0.3);
    	player.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
    	// sprite.scale.setTo(0.3, 0.3);
    	player.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
    	player.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
    	player.body.moveDown(400);
    }

    if (spaceBar.isDown)
    {
    	player.body.velocity.y = -450;
		player.body.gravity.y = 400;
    }

}
function checkPos(syntax) {

    if (syntax.x > 800)
    {
        syntax.x = -100;
    }

}
function updateCounter() {
    total++;
}

function render() {

    // game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
    game.debug.text('Score: ' + total, 32, 64);

}
function collisionHandler(player, syntax) {
    syntax.kill();
    player.kill();
    console.log("workinggg");
}


})();