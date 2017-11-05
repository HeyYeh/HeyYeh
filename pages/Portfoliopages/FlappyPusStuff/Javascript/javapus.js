var player;  //This is you - cute, right?
var spaceBar; //This is assigned to the spacebar, unsurprisingly
var floor;  //We have two sprites for the sand so that they can alternate positions...
var floor2;  //... and create a smooth loop for the floor
var customBounds; //I brought the floor a little higher to make the sand the base
var gameSpeed;  //This is the sand speed
var score = -1;
var highscore = 0;
var playerAlive = true;
var labelhighscore;
var rockGroup;

window.onload = function () {

    //Create the game window
    var game = new Phaser.Game(480, 640, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });
    
    
    //Basic random number in range function
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Make the rocks and give them their physics properties
    function rocks() {
        if (playerAlive == true) {
        var randoTop = randomIntFromInterval(-100, 100);  //Make the top one at random y
        var randoBottom = randoTop + 484;  //make the bottom one a consistent distance down
        
        //make and add the rocks to the rocks group
        rockGroup.create(rocksTop = game.add.sprite(550, randoTop, "rocksTop")); 
        rockGroup.create(rocksBottom = game.add.sprite(550, randoBottom, "rocksBottom"));
        
        game.physics.p2.enable([rocksTop, rocksBottom], false); //enable physics for rocks
        
        //Give the bottom rocks their physics properties
        rocksBottom.checkWorldBounds = true;  //Are the rocks off screen?
        rocksBottom.body.setRectangle(100, 370, 0, 20); //Set the collider
        rocksBottom.body.data.gravityScale = 0; //0 gravity means no falling
        rocksBottom.body.collideWorldBounds = false;  //don't collide with the screen
        rocksBottom.outOfBoundsKill = true;  //destroy it when it's off screen
        rocksBottom.body.velocity.x = -180;  //speed
        rocksBottom.body.damping = 0;  //Stops the rocks decelerating
        rocksBottom.body.setCollisionGroup(rocksCollisionGroup);
        rocksBottom.body.collides([rocksCollisionGroup, playerCollisionGroup]);
        
        
        rocksTop.checkWorldBounds = true;
        rocksTop.body.data.gravityScale = 0;
        rocksTop.body.setRectangle(95, 360, 0, 0);
        rocksTop.body.collideWorldBounds = false;
        rocksTop.outOfBoundsKill = true;
        rocksTop.body.velocity.x = -180;
        rocksTop.body.damping = 0;
        rocksTop.body.setCollisionGroup(rocksCollisionGroup);
        rocksTop.body.collides([rocksCollisionGroup, playerCollisionGroup]);
        
        score += 1;
        labelScore.text = score; 
            
        }
    }

    function preload() {

        game.load.spritesheet('player', 'FlappyPusStuff/Sprites/PusTiles.png', 410, 142);
        game.load.image('background', 'FlappyPusStuff/Sprites/Background.png');
        game.load.image("floor", "FlappyPusStuff/Sprites/FloorFull.png");
        game.load.image("rocksBottom", "FlappyPusStuff/Sprites/RocksBottom.png");
        game.load.image("rocksTop", "FlappyPusStuff/Sprites/RocksTop.png");
        
    }

     
    
    function create() {
        
        playerAlive = true;
        
        score = 0;
        
        
        game.world.setBounds(0,0,480, 575);
         
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 300;
        game.physics.p2.restitution = 0.1;
        
        game.add.image(0, 0, 'background'); 

        playerCollisionGroup = game.physics.p2.createCollisionGroup();
        rocksCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup(); 
  
        rockGroup = game.add.group(); 
        timer = game.time.create(true);
        timer.loop(2200, rocks, this)
        timer.start();
        
        floor = game.add.image(0, 520, "floor");
        floor2 = game.add.image(2400, 520, "floor");
        
        player = game.add.sprite(170, 200, "player");
        player.scale.x = 0.5;
        player.scale.y = 0.5;

        game.physics.p2.enable(player);
        player.body.setRectangle(163, 40, 5, 10);

        player.animations.add("swim");
        
        player.body.setCollisionGroup(playerCollisionGroup);
        player.body.collides([playerCollisionGroup, rocksCollisionGroup]);
         
        
         
        player.body.onBeginContact.add(test, this);
        
        labelScore = game.add.text(40, 20, "0", { font: "50px Arial", fill: "#ffffff" });
        labelhighScore = game.add.text(410, 20, highscore, { font: "50px Arial", fill: "#ffffff" });
        
       
      
        spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        gameSpeed = 3;
 
    }

 
    var playerAngle = 0;

    function test() {
    playerAlive = false;
    labelGO = game.add.text(game.width / 2 , game. height / 2, 'Score: '+score+'\nGAME OVER\nPress SPACE to restart',{ font: '22px Lucida Console', fill: '#fff', align: 'center'});   labelGO.anchor.setTo(0.5, 0.5);
    }
    
    function update() {

        player.body.angle = playerAngle

        if (spaceBar.isDown) {
            player.animations.play("swim", 3, false);
            playerAngle = -20;
            player.body.velocity.y = -150;
        }

        if (playerAngle < 0) {
            playerAngle += .5;
        }


        floor.x -= gameSpeed;
        floor2.x -= gameSpeed; 
        
        floor.bringToTop();
        floor2.bringToTop();
        player.bringToTop();
        labelScore.bringToTop();
        labelhighScore.bringToTop();
        
        if (floor.x < -2400) {

            floor.x = 2395;

        }

        if (floor2.x < -2400) {

            floor2.x = 2395;

        }
        
        //player.body.collides(rocks, test, this)
        game.physics.arcade.overlap(player, rocks, test, null, this);
        
        if (spaceBar.isDown && playerAlive == false) {
            this.game.state.restart()
            
            if (score > highscore)
            {
                highscore = score;
            }
        }
        
    }

}
