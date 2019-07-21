/** @type HTMLCanvasElement */
/** @type CanvasRenderingContext2D */

class Platform {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw() {
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    game.ctx.fillRect(this.x, this.y, this.w, this.h);
    game.ctx.closePath();
  }
}

let joystick = {
  direction: null,
  position: null
};

class Game {
  constructor() {
    this.intevalId = "";
    this.canvas = "";
    this.ctx = "";
    this.fps = 60;
    this.counter = 0;
    this.img = new Image();
    this.img.src = "img/cave.jpg";
    this.w = 1200;
    this.h = 700;
    this.h2 = this.h / 2;
    this.xDoll = 205;
    this.yDoll = 0;
    this.key_right = 39;
    this.key_left = 37;
    this.key_space = 32;
    this.PI = Math.PI;
    this.PI_DOUBLE = Math.PI;
    this.PI_HALF = Math.PI / 2;
    this.circleRadius = 25;
    this.boxPositionBoundary = this.h2 + 300 - this.circleRadius;
    this.posY = this.boxPositionBoundary;
    this.ballIsMoving = true;
    this.acceleration = 0;
    this.acumulatedAcceleration = 0;
    this.sense = -1;
    this.speed = 0;
    this.spacebarPressed = false;
    this.moments = 0;
    this.oldPosition = 0;
    this.dif = false;
    this.platforms = [];

    this.red = "#ff0000";
    this.green = "#00ff00";
    this.blue = "#0000ff";
    this.yellow = "#ffff00";
    this.magenta = "#ff00ff";
    this.cian = "#00ffff";
    // this.finalYPosition = this.posY+= ((this.speed - this.acumulatedAcceleration) * this.sense)
  }

  initGame = id => {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.start();
  };

  start = () => {
    this.platforms = [
      new Platform(0, 670, 1200, 10, this.red),
      new Platform(100, 570, 140, 10, this.green),
      new Platform(200, 480, 140, 10, this.magenta),
      new Platform(100, 390, 140, 10, this.yellow),
      new Platform(200, 300, 800, 10, this.green),
      new Platform(60, 220, 140, 10, this.red),
      new Platform(200, 140, 180, 10, this.blue),
      new Platform(400, 60, 160, 10, this.red),
      new Platform(650, 580, 180, 10, this.cian),
      new Platform(800, 500, 180, 10, this.magenta),
      new Platform(1000, 370, 180, 10, this.yellow),
      new Platform(900, 210, 140, 10, this.red),
      new Platform(1000, 120, 140, 10, this.magenta)
    ];

    this.reset();
    this.intervalId = setInterval(() => {
      if (this.spacebarPressed) {
        this.acumulatedAcceleration += this.acceleration; // console.log(acumulatedAcceleration)
      }

      this.counter++;
      this.clear();
      this.moveAll();
      this.draw();
      this.listener();

      // here you can check the collision of your player against any platform
      this.platforms.forEach(platform => {
        // console.log(this.finalYPosition)
        if (this.finalYPosition > this.oldPosition) this.dif = true;
        else if (this.finalYPosition < this.oldPosition) this.dif = false;
        this.oldPosition = this.finalYPosition;
        if (
          this.xDoll + 40 > platform.x &&
          this.finalYPosition + 50 > platform.y &&
          this.finalYPosition + 50 < platform.y + 15 &&
          this.xDoll + 8 < platform.x + platform.w &&
          this.dif &&
          platform.color != "this.red"
        ) {
          // collision has been detecteddebugger

          this.acceleration = 9.8 / 25;
          this.speed = 10;
          this.speed = 0;
          this.acumulatedAcceleration = 0;
          this.spacebarPressed = false;
          this.finalYPosition = this.boxPositionBoundary + platform.y;

          switch (platform.color) {
            case this.red:debugger
              this.platforms.forEach(platform => {
                if (platform.color == this.red) platform.color = this.cian;
              });
              break;

            case this.magenta:
              this.platforms.forEach(platform => {
                if (platform.color == this.magenta) platform.color = this.green;
              });

              break;

            case this.yellow:
              this.platforms.forEach(platform => {
                if (platform.color == this.yellow) platform.color = this.blue;
              });
              break;

            case this.green:
              this.platforms.forEach(platform => {
                if (platform.color == this.green) platform.color = this.magenta;
              });
              break;

            case this.cian:
              this.platforms.forEach(platform => {
                if (platform.color == this.cian) platform.color = this.red;
              });
              break;

            case this.blue:
              this.platforms.forEach(platform => {
                if (platform.color == this.blue) platform.color = this.yellow;
              });
              break;
          }
          console.log("Collision detected");
        }
      });

      this.finalYPosition = this.posY +=
        (this.speed - this.acumulatedAcceleration) * this.sense;
      //console.log(this.finalYPosition = this.posY+= ((this.speed - this.acumulatedAcceleration) * this.sense))

      if (this.finalYPosition > this.boxPositionBoundary) {
        this.speed = 0;
        this.acumulatedAcceleration = 0;
        this.spacebarPressed = false;
        this.finalYPosition = this.boxPositionBoundary;
      }
    }, 1000 / this.fps);
  };

  clear = () => {
    this.ctx.clearRect(0, 0, 470, 550);
  };

  stop = () => {
    clearInterval(this.intervalId);
  };

  draw = () => {
    this.drawBackground();
    this.drawPlatforms();
    this.drawDoll();
  };

  drawBackground = () => {
    // this.ctx.beginPath();
    this.ctx.drawImage(this.img, 0, 0, this.w, this.h);
    // this.ctx.fillStyle = "grey";
    // this.ctx.fillRect(0, 0, 9370, 5350);
    // this.ctx.closePath();
  };

  drawPlatforms = () => {
    this.platforms.forEach(platform => platform.draw());
  };

  reset = () => {
    // this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
    //  this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys);
    // this.scoreBoard = ScoreBoard;
    // this.framesCounter = 0;
    // this.obstacles = [];
    // this.score = 0;
  };

  drawDoll = () => {
    // this.ctx.beginPath();
    // this.ctx.fillStyle = "grey";
    // this.ctx.fillRect(80, 610, 40, 50);
    // this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.rect(this.xDoll, this.finalYPosition, 40, 50);
    this.ctx.fill();
    this.ctx.closePath();

    // ctx.beginPath();
    // ctx.arc(0, 0, circleRadius, 0, PI_DOUBLE);
    // ctx.fill();
    // ctx.closePath();
    // this.player.draw(this.framesCounter);
  };

  listener = () => {
    // console.log(joystick)
    if (joystick.direction === -1) {
      if (this.xDoll >= -50) {
        this.xDoll -= 5;
        // console.log(joystick.direction)
      }
    }

    if (joystick.direction === 1) {
      if (this.xDoll <= 1050) {
        this.xDoll += 5;
      }
    }

    if (joystick.position > 0) {
      this.spacebarPressed = true;
      this.acceleration = 9.8 / 25;
      this.speed = 10;
      // console.log("yeeaahh")
    }

    document.onkeydown = e => {
      e.preventDefault();
      // console.log(e.keyCode);
      switch (e.keyCode) {
        case this.key_left:
          if (this.xDoll >= -0) {
            this.xDoll -= 10;
          }
          break;
        case this.key_right:
          if (this.xDoll <= canvas.width - 40) {
            this.xDoll += 10;
          }
          break;
        case this.key_space:
          this.spacebarPressed = true;
          this.acceleration = 9.8 / 20;
          this.speed = 10;

          break;
      }
    };
  };

  moveAll = () => {
    // this.background.move();
    //  this.player.move();
    // this.obstacles.forEach(function(obstacle) {
    //   obstacle.move();
    // });
  };
}
