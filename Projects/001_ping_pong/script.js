const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");
const lineWidth = 15;
const gapX = 10;

const field = {
  w: window.innerWidth,
  h: window.innerHeight,
  draw() {
    canvasCtx.fillStyle = "#286047";
    canvasCtx.fillRect(0, 0, this.w, this.h);
  },
};

const line = {
  w: 15,
  h: field.h,
  draw() {
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h);
  },
};

const leftPaddle = {
  x: gapX,
  y: 100,
  w: line.w,
  h: 200,
  draw() {
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);
  },
};

const rightPaddle = {
  x: gapX,
  y: 120,
  w: line.w,
  h: 200,
  draw() {
    canvasCtx.fillRect(field.w - line.w - this.x, this.y, line.w, this.h);
  },
};

const ball = {
  x: 300,
  y: 200,
  r: 20,
  speed: 5,

  _move() {
    this.x += 1 * this.speed;
    this.y += 1 * this.speed;
  },

  draw() {
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.beginPath();
    canvasCtx.arc(this.y, this.x, this.r, 0, 2 * Math.PI, false);
    canvasCtx.fill();

    this._move();
  },
};

const score = {
  human: 1,
  computer: 0,
  draw() {
    canvasCtx.font = "bold 72px Arial";
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillStyle = "#01341D";
    canvasCtx.fillText("3", field.w / 4, 50);
    canvasCtx.fillText("1", field.w / 4 + field.w / 2, 50);
  },
};

const setup = () => {
  canvasEl.width = canvasCtx.width = field.w;
  canvasEl.height = canvasCtx.height = field.h;
};

const draw = () => {
  field.draw();
  line.draw();
  leftPaddle.draw();
  rightPaddle.draw();
  score.draw();
  ball.draw();
};

window.animateFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function main() {
  animateFrame(main);
  draw();
}

main();
setup();
