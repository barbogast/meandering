export const HEIGHT = 50;
export const WIDTH = 50;
export const RECT_SIZE = 15;
export const INITIAL_APPLES = 10;
export const canvas = document.getElementById("root");
export const ctx = canvas.getContext("2d");
export const KeyCodeMap = {
  arrow: {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right"
  },
  awsd: {
    KeyA: "left",
    KeyW: "up",
    KeyS: "down",
    KeyD: "right"
  }
};
