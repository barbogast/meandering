export type Pos = { x: number; y: number };
export type State = {
  dimensions: { height: number; width: number };
  blocks: Pos[];
  snake: Pos[];
  apples: Pos[];
  // The player may do more than one key press before the current one is exectued
  directions: ('up' | 'down' | 'left' | 'right')[];
  isAlive: boolean;
};
