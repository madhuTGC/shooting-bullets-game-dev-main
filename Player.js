// export default class Player {
//   constructor(x, y, bulletController) {
//     this.x = x;
//     this.y = y;
//     this.bulletController = bulletController;
//     this.width = 50;
//     this.height = 50;
//     this.speed = 4;

//     document.addEventListener("keydown", this.keydown);
//     document.addEventListener("keyup", this.keyup);
//   }

//   draw(ctx) {
//     this.move();
//     ctx.strokeStyle = "yellow";
//     ctx.strokeRect(this.x, this.y, this.width, this.height);
//     ctx.fillStyle = "black";
//     ctx.fillRect(this.x, this.y, this.width, this.height);

//     this.shoot();
//   }

//   shoot() {
//     if (this.shootPressed) {
//       const speed = 5;
//       const delay = 7;
//       const damage = 1;
//       const bulletX = this.x + this.width / 2;
//       const bulletY = this.y;
//       this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
//     }
//   }

//   move() {
//     if (this.downPressed) {
//       this.y += this.speed;
//     }
//     if (this.upPressed) {
//       this.y -= this.speed;
//     }
//     if (this.leftPressed) {
//       this.x -= this.speed;
//     }

//     if (this.rightPressed) {
//       this.x += this.speed;
//     }
//   }

//   keydown = (e) => {
//     if (e.code === "ArrowUp") {
//       this.upPressed = true;
//     }
//     if (e.code === "ArrowDown") {
//       this.downPressed = true;
//     }
//     if (e.code === "ArrowLeft") {
//       this.leftPressed = true;
//     }
//     if (e.code === "ArrowRight") {
//       this.rightPressed = true;
//     }
//     if (e.code === "Space") {
//       this.shootPressed = true;
//     }
//   };

//   keyup = (e) => {
//     if (e.code === "ArrowUp") {
//       this.upPressed = false;
//     }
//     if (e.code === "ArrowDown") {
//       this.downPressed = false;
//     }
//     if (e.code === "ArrowLeft") {
//       this.leftPressed = false;
//     }
//     if (e.code === "ArrowRight") {
//       this.rightPressed = false;
//     }
//     if (e.code === "Space") {
//       this.shootPressed = false;
//     }
//   };
// }





// Player.js
export default class Player {
  constructor(x, y, bulletController) {
    this.x = x;
    this.y = y;
    this.bulletController = bulletController;
    this.width = 50;
    this.height = 50;
    this.speed = 4;

    this.touchStartY = 0;
    this.touchStartX = 0;

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);

    // Add touch event listeners
    document.addEventListener("touchstart", this.touchstart);
    document.addEventListener("touchend", this.touchend);
    document.addEventListener("touchmove", this.touchmove);
  }

  draw(ctx) {
    this.move();
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    this.shoot();
  }

  shoot() {
    if (this.shootPressed) {
      const speed = 5;
      const delay = 7;
      const damage = 1;
      const bulletX = this.x + this.width / 2;
      const bulletY = this.y;
      this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
    }
  }

  move() {
    if (this.downPressed) {
      this.y += this.speed;
    }
    if (this.upPressed) {
      this.y -= this.speed;
    }
    if (this.leftPressed) {
      this.x -= this.speed;
    }
    if (this.rightPressed) {
      this.x += this.speed;
    }
  }

  keydown = (e) => {
    if (e.code === "ArrowUp") {
      this.upPressed = true;
    }
    if (e.code === "ArrowDown") {
      this.downPressed = true;
    }
    if (e.code === "ArrowLeft") {
      this.leftPressed = true;
    }
    if (e.code === "ArrowRight") {
      this.rightPressed = true;
    }
    if (e.code === "Space") {
      this.shootPressed = true;
    }
  };

  keyup = (e) => {
    if (e.code === "ArrowUp") {
      this.upPressed = false;
    }
    if (e.code === "ArrowDown") {
      this.downPressed = false;
    }
    if (e.code === "ArrowLeft") {
      this.leftPressed = false;
    }
    if (e.code === "ArrowRight") {
      this.rightPressed = false;
    }
    if (e.code === "Space") {
      this.shootPressed = false;
    }
  };

  // Touch event handlers
  touchstart = (e) => {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  };

  touchend = () => {
    this.touchStartX = 0;
    this.touchStartY = 0;
  };

  touchmove = (e) => {
    if (this.touchStartX && this.touchStartY) {
      const deltaX = e.touches[0].clientX - this.touchStartX;
      const deltaY = e.touches[0].clientY - this.touchStartY;

      // Adjust sensitivity based on your needs
      const sensitivity = 2;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > sensitivity) {
          this.rightPressed = true;
          this.leftPressed = false;
        } else if (deltaX < -sensitivity) {
          this.leftPressed = true;
          this.rightPressed = false;
        }
      } else {
        if (deltaY > sensitivity) {
          this.downPressed = true;
          this.upPressed = false;
        } else if (deltaY < -sensitivity) {
          this.upPressed = true;
          this.downPressed = false;
        }
      }
    }
  };
}
