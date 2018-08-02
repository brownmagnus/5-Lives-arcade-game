// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 73;
    this.speed = speed;
    this.step = 101;
    this.boundary = this.step * 5;
    this.restPos = -this.step;
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

    // while ememy still on screen
    if(this.x < this.boundary) {
      // Move forward across the screen
      this.x += this.speed * dt;
    } else {
      // Reset post to start
      this.x = this.restPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Game player class
var Player = function(charIn) {
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 73;
    this.x = this.startX;
    this.y = this.startY;
    // The image/sprite for our player
    this.sprite = charIn;
    this.victory = false;
};

// check for any collision while the game is on
Player.prototype.update = function() {
  // check for any collision here
  for (let enemy of allEnemies) {
    // Is player's on the tile with eme
    if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2))  {
      this.reset();
    }
  }

  // Check if the player reach the final tile
    if(this.y === -10) {
      gameLevel += 1;
      if (gameLevel === 5) {
        gameLevel = 0;
      }
      reward();
      this.victory = true;
    }
};

// change to a new player
Player.prototype.changeP = function() {
  this.sprite = levelChar[gameLevel];
};
// Reset the player position to the start
Player.prototype.reset = function() {
  this.y = this.startY;
  this.x = this.startX;
};
// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(input) {
  if (input == 'left') {
      if (this.x > 0) {
        this.x -= this.step;
      }
    } else if (input == 'right') {
      if (this.x < this.step * 4) {
        this.x += this.step;
      }
    } else if (input == 'up') {
      if(this.y > 0) {
        this.y -= this.jump;
      }
    } else if (input == 'down') {
      if (this.y < this.jump * 4) {
        this.y += this.jump;
      }
    }
};

// Change the reward image if player wins
function reward() {
  if (gameLevel === 1) {
    document.querySelector('.reward').src = 'images/Gem Blue.png';
  } else if (gameLevel === 2) {
    document.querySelector('.reward').src = 'images/Gem Green.png';
  } else if (gameLevel === 3) {
    document.querySelector('.reward').src = 'images/Gem Blue.png';
  } else if (gameLevel === 4) {
    document.querySelector('.reward').src = 'images/Gem Orange.png';
  } else {
    document.querySelector('.reward').src = 'images/Heart.png';
  }
}
// Now instantiate your objects.
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 83, 250);
const bug4 = new Enemy(-101, 166, 150);
const allEnemies = [];
// Place all enemy objects in an array called allEnemies
allEnemies.push(bug1, bug2, bug3, bug4);
// Place the player object in a variable called player
const levelChar = [
        'images/char-boy.png',
        'images/char-horn-girl.png',
        'images/char-cat-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'];
let gameLevel = 0;
const player =  new Player(levelChar[gameLevel]);


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
