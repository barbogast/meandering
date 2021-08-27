import { ctx, RECT_SIZE, WIDTH, HEIGHT } from './constants';
import { Pos, State } from './types';

export const drawRect = (pos: Pos, color: string, fill: string | void) => {
  ctx.fillStyle = color;
  ctx.fillRect(pos.x * RECT_SIZE, pos.y * RECT_SIZE, RECT_SIZE, RECT_SIZE);

  const width = RECT_SIZE * 0.1;
  ctx.fillStyle = fill ? fill : 'lightgrey';
  ctx.fillRect(
    pos.x * RECT_SIZE + width,
    pos.y * RECT_SIZE + width,
    RECT_SIZE - width * 2,
    RECT_SIZE - width * 2
  );
};

export const draw = (state: State) => {
  ctx.clearRect(0, 0, WIDTH * RECT_SIZE, HEIGHT * RECT_SIZE);

  for (const pos of state.blocks) {
    drawRect(pos, 'grey', 'grey');
  }

  for (const pos of state.apples) {
    drawRect(pos, 'green', 'green');
  }

  for (const snake of state.snakes) {
    for (const pos of snake.body) {
      drawRect(pos, snake.color, snake.isAlive ? snake.color : undefined);
    }
    if (!snake.isAlive) {
      // Draw over the head of the snake in red if it's dead, so the player knows
      // where it died
      drawRect(snake.body[snake.body.length - 1], snake.color, 'red');
    }
  }
};
