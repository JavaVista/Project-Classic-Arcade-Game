// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y + 55;
  this.column = 101;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // if statement to check if enemy passed boundary
  if (this.x < this.column * 5) {
    //move forward x by speed  * dt
    this.x += this.speed * dt;
  } else {
    // reset pos
    this.x = 0;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 387;
    this.column = 101;
    this.row = 83;
    this.win = false;
  }
  update(dt) {
    //check collision
    for (const enemy of allEnemies) {
      //check if enemy collided check x and y
      if (
        this.y === enemy.y &&
        (enemy.x + enemy.column / 2 > this.x &&
          enemy.x < this.x + this.column / 2)
      ) {
        this.reset();
      }
    }
    // check win - player reach final tile by checking x and y
    if (this.y === -28) {
      this.win = true;
    }
  }
  // Draw player on the screen
  render() {
    // Update player x and y based on the input
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(input) {
    switch (input) {
      case "left":
        if (this.x > 0) {
          this.x -= this.column;
        }
        break;
      case "up":
        if (this.y > 0 ) {
          this.y -= this.row;
        }
        break;
      case "right":
        if (this.x < this.column * 3) {
          this.x += this.column;
        }
        break;
      case "down":
        if (this.y < this.row * 4) {
          this.y += this.row;
        }
    }
  }
  // Reset player
  reset() {
    this.x = 200;
    this.y = 387;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemyBug1 = new Enemy(-101, 0, 200);
const enemyBug2 = new Enemy(-101, 83, 100);
const enemyBug3 = new Enemy(-101 * 2.5, 83, 150);
const allEnemies = [];
allEnemies.push(enemyBug1, enemyBug2, enemyBug3);
let player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
