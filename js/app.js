// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // let enemies go back to the starting point when reaching
    // the end of the canvas (canvas.width).
    if (this.x >= 505) {
        this.x = 0;
    }

    // Check if player collide with enemy

    var checkCollision = function(anEnemy) {
        if (
            player.x + 15 <= anEnemy.x + 90 &&
            player.y + 100 >= anEnemy.y + 100 &&
            player.x + 80 >= anEnemy.x + 26 &&
            player.y + 80 <= anEnemy.y + 120) {
            // if the player collide with an enemy it will return it to the starting point
            player.x = 200;
            player.y = 500;
        }

        var increaseEnemies = function(num) {
            allEnemies.length = 0;

            // push enemies
            for (var i = 0; i <= num; i++) {
                var enemy = new Enemy(0, Math.random() * 200 + 50, Math.random() * 250);
                allEnemies.push(enemy);
            }
        };
        // if the player reached the top of the canvas it will
        // return it to the starting point, fill the rectangle
        // on the top of the canvas with white, and increase the score
        if (player.y + 50 <= 0) {
            player.x = 200;
            player.y = 500;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 500, 170);
            score += 1;
            increaseEnemies(score);
        }
        // end of checkCollision() function.
    };
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-princess-girl.png';
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {



    // keeps the player inside the canvas
    if (player.x > 400) {
        player.x = 400;
    }
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y > 400) {
        player.y = 400;
    }
};

// Now we need to use render() to draw the player and to display the score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScore(score);
};

// handleInput() is used to enable the user to move the player up, down, left, and right
// we set the amount of the movement for each input
Player.prototype.handleInput = function(input) {
    if (input == 'left') {
        this.x -= 40;
    }
    if (input == 'up') {
        this.y -= 40;
    }
    if (input == 'right') {
        this.x += 40;
    }
    if (input == 'down') {
        this.y += 40;
    }
};

// score will increase when a player reches the water and wins
var displayScore = function(playerScore) {
    var canvas = document.getElementsByTagName('canvas');
    var fCanvas = canvas[0];

    scoreDiv.innerHTML = 'Score: ' + playerScore;
    document.body.insertBefore(scoreDiv, fCanvas[0]);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player(200, 400);
var score = 0;
var scoreDiv = document.createElement('div');
allEnemies.push(new Enemy(0, Math.random() * 200 + 50, Math.random() * 250));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// keydown is placed to allow the user to hold the key for continuous movement
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
