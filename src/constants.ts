import { Direction } from './types';

export const RECT_SIZE = 15;
export const INITIAL_APPLES = 10;
export const BACKGROUND_COLOR = 'lightgrey';

export const canvas = document.getElementById('root') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

export const KeyCodeMap: { [key: string]: { [key: string]: Direction } } = {
  arrow: {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  },
  awsd: {
    KeyA: 'left',
    KeyW: 'up',
    KeyS: 'down',
    KeyD: 'right',
  },
};
