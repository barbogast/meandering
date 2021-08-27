import { ctx, RECT_SIZE, WIDTH, HEIGHT } from './constants';
import { Pos, State } from './types';

export const drawRect = (color: string, pos: Pos) => {
  ctx.fillStyle = color;
  ctx.fillRect(pos.x * RECT_SIZE, pos.y * RECT_SIZE, RECT_SIZE, RECT_SIZE);
};

export const draw = (state: State) => {
  ctx.clearRect(0, 0, WIDTH * RECT_SIZE, HEIGHT * RECT_SIZE);

  for (const pos of state.blocks) {
    drawRect('grey', pos);
  }

  for (const pos of state.apples) {
    drawRect('green', pos);
  }

  for (const snake of state.snakes) {
    for (const pos of snake.body) {
      drawRect(snake.color, pos);
    }
    if (!snake.isAlive) {
      // Draw over the head of the snake in red if it's dead, so the player knows
      // where it died
      drawRect('red', snake.body[snake.body.length - 1]);
    }
  }
};
