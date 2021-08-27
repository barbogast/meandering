import {ctx, RECT_SIZE, WIDTH, HEIGHT} from "./constants.js";
export const drawRect = (pos, color, fill) => {
  ctx.fillStyle = color;
  ctx.fillRect(pos.x * RECT_SIZE, pos.y * RECT_SIZE, RECT_SIZE, RECT_SIZE);
  const width = RECT_SIZE * 0.1;
  ctx.fillStyle = fill ? fill : "lightgrey";
  ctx.fillRect(pos.x * RECT_SIZE + width, pos.y * RECT_SIZE + width, RECT_SIZE - width * 2, RECT_SIZE - width * 2);
};
export const draw = (state) => {
  ctx.clearRect(0, 0, WIDTH * RECT_SIZE, HEIGHT * RECT_SIZE);
  for (const pos of state.blocks) {
    drawRect(pos, "grey", "grey");
  }
  for (const pos of state.apples) {
    drawRect(pos, "green", "green");
  }
  for (const snake of state.snakes) {
    for (const pos of snake.body) {
      drawRect(pos, snake.color, snake.isAlive ? snake.color : void 0);
    }
    if (!snake.isAlive) {
      drawRect(snake.body[snake.body.length - 1], snake.color, "red");
    }
  }
};
