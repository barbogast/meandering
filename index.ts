const HEIGHT = 50;
const WIDTH = 50;
const RECT_SIZE = 15;
const INITIAL_APPLES = 10;

const canvas = document.getElementById('root') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

type Pos = { x: number; y: number };
type State = {
  dimensions: { height: number; width: number };
  blocks: Pos[];
  snake: Pos[];
  apples: Pos[];
  // The player may do more than one key press before the current one is exectued
  directions: ('up' | 'down' | 'left' | 'right')[];
  isAlive: boolean;
};

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

// Use https://asciiflow.com to create levels
const level = `
┌───       ──────────────────────────┐
│                                    │
│                                    │
│                                    │
│                                    │
├───────────────────────             │
│                                    │
│                                    │
│                                    │
│                                    │
│             ───────────────────────┤
│                                    │
│                                    │
│                                    │
│                                    │
│                                    │
├────────────────────────────────────┤
│                                    │
│                                    │
│                                    │
│                                    │
│                                    │
│                                    │
│                                    │
├─────────────────────────────       │
│                                    │
│                                    │
│                                    │
│                                    │
│                                    │
└────       ─────────────────────────┘
`;

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const loadLevel = () => {
  const rows = level.trim().split('\n');
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] !== ' ') {
        state.blocks.push({ x, y });
      }
    }
  }
  state.dimensions = {
    width: rows[0].length,
    height: rows.length,
  };
};

const drawRect = (color: string, pos: Pos) => {
  ctx.fillStyle = color;
  ctx.fillRect(pos.x * RECT_SIZE, pos.y * RECT_SIZE, RECT_SIZE, RECT_SIZE);
};

const draw = () => {
  ctx.clearRect(0, 0, WIDTH * RECT_SIZE, HEIGHT * RECT_SIZE);

  for (const pos of state.blocks) {
    drawRect('grey', pos);
  }

  for (const pos of state.apples) {
    drawRect('green', pos);
  }

  for (const pos of state.snake) {
    drawRect('black', pos);
  }

  if (!state.isAlive) {
    // Draw over the head of the snake in red if it's dead, so the player knows
    // where it died
    drawRect('red', state.snake[state.snake.length - 1]);
  }
};

const moveSnake = () => {
  const currentHead = state.snake[state.snake.length - 1];
  let newHead: Pos;
  switch (state.directions[0]) {
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

  if (state.apples.some((pos) => pos.x === newHead.x && pos.y === newHead.y)) {
    /* Snake eats apple: 
       - remove apple
       - add a new apple
       - move snake forward by adding a head
       - don't remove tail so snake grows by one
    */
    state.apples = state.apples.filter((pos) => pos.x !== newHead.x || pos.y !== newHead.y);
    state.snake.push(newHead);
    addApple();
  } else if (state.blocks.some((pos) => pos.x === newHead.x && pos.y === newHead.y)) {
    /* Snake hits block and dies: 
       - move one forward so the user sees which block was hit
       - kill snake
    */
    state.snake.shift();
    state.snake.push(newHead);
    state.isAlive = false;
  } else {
    /* Snake moves forward: 
       - add new head
       - remove tail
    */
    state.snake.shift();
    state.snake.push(newHead);
  }

  if (state.directions.length > 1) {
    state.directions.shift();
  }
};

const addApple = () => {
  let counter = 0;
  let apple: Pos;

  while (true) {
    apple = {
      x: randomIntFromInterval(0, state.dimensions.width),
      y: randomIntFromInterval(0, state.dimensions.height),
    };
    if (
      !state.blocks.some((pos) => pos.x === apple.x && pos.y === apple.y) &&
      !state.snake.some((pos) => pos.x === apple.x && pos.y === apple.y) &&
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

let counter = 0;
const mainLoop = () => {
  draw();
  if (state.isAlive) {
    requestAnimationFrame(mainLoop);
  }
  if (counter % 8 === 0) {
    moveSnake();
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

  loadLevel();
  for (let i = 0; i < INITIAL_APPLES; i++) {
    addApple();
  }
  canvas.setAttribute('height', String(state.dimensions.height * RECT_SIZE));
  canvas.setAttribute('width', String(state.dimensions.width * RECT_SIZE));

  mainLoop();
};

main();
