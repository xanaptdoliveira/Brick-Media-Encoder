class Brick {
  constructor(x, y, w, h, rotation, color, mode) {
    this.x = x;
    this.y = y;

    this.w = w * canvas.cell_size;
    this.h = h * canvas.cell_size;
    this.r = rotation;

    this.c = color;
    this.mode = mode; //Image mode
    for (let i = 1; i < imgs.length; i++) {
      if (mode == i) this.img = imgs[i];
    }

    this.counter = 0;

    ////////// Images inside bricks
    this.rX = int(random(this.img.width - this.w));
    this.rY = int(random(this.img.height - this.h));
    this.img2 = createImage(this.w, this.h, RGB);
    this.img2.copy(this.img, this.rX, this.rY, this.w, this.h, 0, 0, this.w, this.h);

    // Center of brick
    this.cx = this.x + this.w / 2;
    this.cy = this.y + this.h / 2;
    // Snap to grid
    this.xingrid = 0;
    this.prevx = this.x;
    // Mouve over brick
    this.rollover = false;
  }

  snapToGrid() { // Snap brick to grid
    this.snapXtogrid = map(
      this.x - canvas.px,
      0, canvas.ncells * canvas.cell_size,
      0, canvas.ncells
    );
    this.x = canvas.px + int(this.snapXtogrid) * canvas.cell_size;

    this.snapYtogrid = map(
      this.y - canvas.py,
      0, canvas.ncells * canvas.cell_size,
      0, canvas.ncells
    );
    this.y = canvas.py + int(this.snapYtogrid) * canvas.cell_size;
  }

  updatePosition() {
    this.snapToGrid();
    this.checkBorders();
  }

  over() { // Is mouse over object?
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      this.rollover = true;
      cursor("MOVE");
    } else {
      this.rollover = false;
      cursor("AUTO");
    }
  }

  rotate(r) {
    if (r === 1) {

    }
  }

  // Brick Layout
  drawBrick() {
    stroke(0, 200);
    // Main viewbox of brick
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
    // Circles of brick
    for (let i = 0; i < this.w / canvas.cell_size; i += 1) {
      for (let j = 0; j < this.h / canvas.cell_size; j += 1) {
        ellipse(
          this.x + i * canvas.cell_size + canvas.cell_size / 2,
          this.y + j * canvas.cell_size + canvas.cell_size / 2,
          canvas.cell_size - canvas.cell_size / 4
        );
      }
    }
    
    if ((this.dragging && mousePressed) || (this.rollover && mousePressed)) {
      fill(0, 60); // Draw shape on top of brick based on hover to tell user its selected
      rect(this.x, this.y, this.w, this.h);
    }
  }

  // Draw Images
  drawMedia() {
    // time for images to change 
    if (this.counter === 20) {
      this.rX = int(random(this.img.width - this.w));
      this.rY = int(random(this.img.height - this.h));
      this.img2 = createImage(this.w, this.h, RGB);
      this.img2.copy(this.img, this.rX, this.rY, this.w, this.h, 0, 0, this.w, this.h);
    } else if (this.counter > 20) {
      this.counter = 0;
    }
    this.counter++;
    image(this.img2, this.x, this.y);
  }    

  drawMedia2(x2, y2) {
    // // time for images to change 
    // if (this.counter === 100) {
    //   this.rX = int(random(this.img.width - this.w));
    //   this.rY = int(random(this.img.height - this.h));
    //   this.img2 = createImage(this.w, this.h, RGB);
    //   this.img2.copy(this.img, this.rX, this.rY, this.w, this.h, 0, 0, this.w, this.h);
    // } else if (this.counter > 100) {
    //   this.counter = 0;
    // }
    // this.counter++;

    // image(this.img2, this.x, this.y);
    // image(this.img2, x2, y2);
  }       

  collision(a, b) { // Did I click on the rectangle?
    return (
      a > this.x &&
      a < this.x + this.w &&
      b > this.y &&
      b < this.y + this.h
    );

    // If so, keep track of relative location of click to corner of rectangle
    //    this.offsetX = this.x - mouseX;
    //   this.offsetY = this.y - mouseY;
  }

  newColor(c) { // Update color
    this.c = c;
  }

  checkBorders() { // Dont let brick go out of the canvas borders
    if (this.x < canvas.px) {
      this.x = canvas.px;
    }
    if (this.x + this.w > canvas.px + canvas.ncells * canvas.cell_size) {
      this.x = canvas.px + canvas.ncells * canvas.cell_size - this.w;
    }
    if (this.y < canvas.py) {
      this.y = canvas.py;
    }
    if (this.y + this.h > canvas.py + canvas.ncells * canvas.cell_size) {
      this.y = canvas.py + canvas.ncells * canvas.cell_size - this.h;
    }
  }

}


