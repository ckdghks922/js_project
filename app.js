const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputRange = document.getElementById('canvas-width');
const inputColor = document.getElementById('canvas-color');
const inputClear = document.getElementById('canvas-clear');
const inputEraser = document.getElementById('canvas-eraser');

const CANVAS_SIZE = 800;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.lineWidth = inputRange.value;

let isDrawing = false;
let isErase = false;

const handleDraw = () => {
  isDrawing = true;
};
const handleCancelDraw = () => {
  isDrawing = false;
  ctx.beginPath();
};
const handleMove = event => {
  if (isDrawing) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  } else ctx.moveTo(event.offsetX, event.offsetY);
};

canvas.addEventListener("mousedown", handleDraw);
canvas.addEventListener("mouseup", handleCancelDraw);
canvas.addEventListener("mouseleave", handleCancelDraw);
canvas.addEventListener("mousemove", handleMove);

const handleWidth = event => {
  ctx.lineWidth = event.target.value;
};
const handleColor = event => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
  if (isErase) handleEraser();
};
const handleClear = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};
const handleEraser = () => {
  if (isErase) {
    isErase = false;
    ctx.strokeStyle = inputColor.value;
    inputEraser.value = '지우개 모드';
  } else {
    isErase = true;
    ctx.strokeStyle = 'white';
    inputEraser.value = '그리기 모드';
  }
};

inputRange.addEventListener('change', handleWidth);
inputColor.addEventListener('change', handleColor);
inputClear.addEventListener('click', handleClear);
inputEraser.addEventListener('click', handleEraser);