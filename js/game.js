
/** @type HTMLCanvasElement */
/** @type CanvasRenderingContext2D */

let joystick = {
  direction: null
}

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
    this.xDoll = 205;
    this.yDoll = 0;
    this.key_right = 39;
    this.key_left = 37;
    this.key_space = 32;
  }

  initGame = (id) => {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.start();
  }

  start = () => {
    this.intervalId = setInterval(() => {
      this.counter++;
      this.clear();
      this.draw();
      this.listener();
    },1000/this.fps)
  }

  clear = () => {
    this.ctx.clearRect(0, 0, 470, 550);
  }

  stop = () => {
    clearInterval(this.intervalId)
  }

  draw = () => {
    this.drawBackground();
    this.drawPlatforms();
    this.drawDoll();
  }

  drawBackground = () => {
    // this.ctx.beginPath();
    this.ctx.drawImage(this.img, 0, 0, this.w, this.h)
    // this.ctx.fillStyle = "grey";
    // this.ctx.fillRect(0, 0, 9370, 5350);
    // this.ctx.closePath();

  }

  drawPlatforms = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(0, 660, 1200, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(100, 570, 140, 10);
    this.ctx.closePath();
    
    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(200, 480, 140, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(100, 390, 140, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(200, 300, 800, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(60, 220, 140, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(200, 140, 180, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(400, 60, 160, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(650, 580, 180, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(800, 500, 180, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(1000, 370, 180, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(900, 210, 140, 10);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(1000, 120, 140, 10);
    this.ctx.closePath();
  }

  drawDoll = () => {
    // this.ctx.beginPath();
    // this.ctx.fillStyle = "grey";
    // this.ctx.fillRect(80, 610, 40, 50);
    // this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.rect(80 + this.xDoll, 610 + this.yDoll, 40, 50)
    this.ctx.fill();
    this.ctx.closePath();
  }
  
  listener = () => {
    if (joystick.direction === -1){
      if(this.xDoll >= -50) {
        this.xDoll -= 5;
      }
    }

    if (joystick.direction === 1){
      if (this.xDoll <= 1050) {
        this.xDoll += 5;
      }
    }


    // document.onkeydown = (e) => {
    //   e.preventDefault();
    //   console.log(e.keyCode);
    //   switch (e.keyCode) {
    //     case this.key_left:
    //       if(this.xDoll >= -50) {
    //         this.xDoll -= 10;
    //       }
    //       break;
    //     case this.key_right:
    //       if (this.xDoll <= 1050) {
    //         this.xDoll += 10;
    //       }
    //       case this.key_space:
    //       // if(this.yDoll <= 10) {
    //       //   this.yDoll -= -20 * Math.sin(this.counter);
    //       // }
    //       break;
    //   }
    // }
  }
  
}