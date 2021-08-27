import { Pos, Snake, State } from './types';
import { randomIntFromInterval } from './utils';

const getNextHeadPosition = (state: State, snake: Snake) => {
  const currentHead = snake.body[snake.body.length - 1];
  let newHead: Pos;
  switch (snake.directions[0]) {
    case 'up': {
      newHead = { x: currentHead.x, y: currentHead.y - 1 };
      break;
    }
    case 'down': {
      newHead = { x: currentHead.x, y: currentHead.y + 1 };
      break;
    }
    case 'right': {
      newHead = { x: currentHead.x + 1, y: currentHead.y };
      break;
    }
    case 'left': {
      newHead = { x: currentHead.x - 1, y: currentHead.y };
      break;
    }
    default: {
      throw new Error('unsupported direction');
    }
  }

  if (newHead.x < 0) {
    newHead.x = state.dimensions.width;
  } else if (newHead.x > state.dimensions.width) {
    newHead.x = 0;
  }

  if (newHead.y < 0) {
    newHead.y = state.dimensions.height;
  } else if (newHead.y > state.dimensions.height) {
    newHead.y = 0;
  }

  return newHead;
};

const snakeWillDie = (state: State, newHead: Pos) =>
  state.blocks.some((pos) => pos.x === newHead.x && pos.y === newHead.y) ||
  state.snakes.some((snake) =>
    snake.body.some((pos) => pos.x === newHead.x && pos.y === newHead.y)
  );

const snakeWillEat = (state: State, newHead: Pos) =>
  state.apples.some((pos) => pos.x === newHead.x && pos.y === newHead.y);

export const moveSnake = (state: State, snake: Snake) => {
  if (!snake.isAlive) {
    return;
  }

  const newHead = getNextHeadPosition(state, snake);
  if (snakeWillEat(state, newHead)) {
    /* - remove apple
       - add a new apple
       - move snake forward by adding a head
       - don't remove tail so snake grows by one
      */
    state.apples = state.apples.filter((pos) => pos.x !== newHead.x || pos.y !== newHead.y);
    snake.body.push(newHead);
    addApple(state);
  } else if (snakeWillDie(state, newHead)) {
    /* - move one forward so the user sees which block was hit
       - kill snake
      */
    snake.body.shift();
    snake.body.push(newHead);
    snake.isAlive = false;
  } else {
    /* Snake moves forward: 
       - add new head
       - remove tail
      */
    snake.body.shift();
    snake.body.push(newHead);
  }

  if (snake.directions.length > 1) {
    snake.directions.shift();
  }
};

export const addApple = (state: State) => {
  let counter = 0;
  let apple: Pos;

  while (true) {
    apple = {
      x: randomIntFromInterval(0, state.dimensions.width),
      y: randomIntFromInterval(0, state.dimensions.height),
    };
    if (
      !state.blocks.some((pos) => pos.x === apple.x && pos.y === apple.y) &&
      !state.snakes.some((snake) =>
        snake.body.some((pos) => pos.x === apple.x && pos.y === apple.y)
      ) &&
      !state.apples.some((pos) => pos.x === apple.x && pos.y === apple.y)
    ) {
      break;
    }

    counter += 1;
    if (counter > 1000) {
      console.log('infinite loop while creating apple, abort');
      return;
    }
  }

  state.apples.push(apple);
};

export const controlAiSnake = (state: State, snake: Snake) => {
  if (!snake.isAlive) {
    return;
  }

  const isHorizontal = ['left', 'right'].includes(snake.directions[0]);
  const newHead = getNextHeadPosition(state, snake);
  if (snakeWillDie(state, newHead)) {
    snake.directions[0] = isHorizontal ? 'down' : 'left';
  }

  const newHead2 = getNextHeadPosition(state, snake);
  if (snakeWillDie(state, newHead2)) {
    snake.directions[0] = isHorizontal ? 'up' : 'right';
  }
};
