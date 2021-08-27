import { State } from './types';

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

export const loadLevel = (state: State) => {
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
