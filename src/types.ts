export type Pos = { x: number; y: number };

export type Control = 'arrow' | 'awsd' | 'ai';

export type Direction = 'up' | 'down' | 'left' | 'right';

export type Snake = {
  body: Pos[];
  // The player may do more than one key press before the current one is exectued
  directions: Direction[];
  isAlive: boolean;
  color: string;
  control: Control;
  nextTarget: Pos | void;
};

export type State = {
  dimensions: { height: number; width: number };
  blocks: Pos[];
  snakes: Snake[];
  apples: Pos[];
};
