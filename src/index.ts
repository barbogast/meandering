import { canvas, INITIAL_APPLES, RECT_SIZE } from './constants';
import { draw } from './draw';
import { loadLevel } from './level';
import { moveSnake, addApple } from './logic';
import { State } from './types';

const state: State = {
  dimensions: { height: 0, width: 0 },
  blocks: [],
  snake: [
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
  apples: [],
  directions: ['right'],
  isAlive: true,
};

let counter = 0;
const mainLoop = () => {
  draw(state);
  if (state.isAlive) {
    requestAnimationFrame(mainLoop);
  }
  if (counter % 8 === 0) {
    moveSnake(state);
  }
  counter = (counter + 1) % 60;
};

const main = () => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    const latestInput = state.directions[state.directions.length - 1];
    const isHorizontal = latestInput === 'left' || latestInput === 'right';
    if (e.code == 'ArrowUp' && isHorizontal) {
      state.directions.push('up');
    } else if (e.code == 'ArrowDown' && isHorizontal) {
      state.directions.push('down');
    } else if (e.code == 'ArrowRight' && !isHorizontal) {
      state.directions.push('right');
    } else if (e.code == 'ArrowLeft' && !isHorizontal) {
      state.directions.push('left');
    }
  });

  loadLevel(state);
  for (let i = 0; i < INITIAL_APPLES; i++) {
    addApple(state);
  }
  canvas.setAttribute('height', String(state.dimensions.height * RECT_SIZE));
  canvas.setAttribute('width', String(state.dimensions.width * RECT_SIZE));

  mainLoop();
};

main();
