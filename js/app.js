// Enemies our player must avoid
var Enemy = function() {
    this.x = 101;
    this.y = 83;

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Game player class
var Player = function() {
    this.step = 100;
    this.jump = 100;
    this.x = 202;
    this.y = 405;
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {

};
// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
  if (input == 'left') {
      this.x -= this.step;
    } else if (input == 'right') {
      this.x += this.step;
    } else if (input == 'up') {
      this.y -= this.jump;
    } else if (input == 'down') {
      this.y += this.jump;
    }
};


// Now instantiate your objects.
const bug1 = new Enemy();
const allEnemies = [];
// Place all enemy objects in an array called allEnemies
allEnemies.push(bug1)
// Place the player object in a variable called player
const player =  new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
