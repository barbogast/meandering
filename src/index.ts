import { canvas, INITIAL_APPLES, KeyCodeMap, RECT_SIZE } from './constants';
import { draw } from './draw';
import { loadLevel } from './level';
import { moveSnake, addApple, controlAiSnake } from './logic';
import { State } from './types';

const state: State = {
  dimensions: { height: 0, width: 0 },
  blocks: [],
  snakes: [
    {
      body: [
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
      ],
      directions: ['right'],
      isAlive: true,
      color: 'blue',
      control: 'arrow',
    },
    {
      body: [
        { x: 3, y: 28 },
        { x: 4, y: 28 },
        { x: 5, y: 28 },
      ],
      directions: ['right'],
      isAlive: true,
      color: 'yellow',
      control: 'awsd',
    },
    {
      body: [
        { x: 3, y: 7 },
        { x: 4, y: 7 },
        { x: 5, y: 7 },
      ],
      directions: ['right'],
      isAlive: true,
      color: 'red',
      control: 'ai',
    },
    {
      body: [
        { x: 3, y: 21 },
        { x: 4, y: 21 },
        { x: 5, y: 21 },
      ],
      directions: ['right'],
      isAlive: true,
      color: 'red',
      control: 'ai',
    },
  ],
  apples: [],
};

let counter = 0;
const mainLoop = () => {
  draw(state);
  if (state.snakes.some((snake) => snake.isAlive)) {
    requestAnimationFrame(mainLoop);
  }
  if (counter % 8 === 0) {
    for (const snake of state.snakes) {
      if (snake.control === 'ai') {
        controlAiSnake(state, snake);
      }
      moveSnake(state, snake);
    }
  }
  counter = (counter + 1) % 60;
};

const main = () => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    let control: 'arrow' | 'awsd' | void;
    if (Object.keys(KeyCodeMap.arrow).includes(e.code)) {
      control = 'arrow';
    } else if (Object.keys(KeyCodeMap.awsd).includes(e.code)) {
      control = 'awsd';
    }

    const snake = state.snakes.find((snake) => snake.control === control);
    if (!control || !snake) {
      return;
    }

    const latestInput = snake.directions[snake.directions.length - 1];
    const isHorizontal = latestInput === 'left' || latestInput === 'right';

    const direction = KeyCodeMap[control][e.code];
    console.log(e.code);

    if (['up', 'down'].includes(direction) && isHorizontal) {
      snake.directions.push(direction);
    } else if (['left', 'right'].includes(direction) && !isHorizontal) {
      snake.directions.push(direction);
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
