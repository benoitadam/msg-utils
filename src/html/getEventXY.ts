import { MouseOrTouchEvent, EventXY } from './interfaces';

export const getEventXY = (ev: MouseOrTouchEvent): EventXY => {
  const e = ev instanceof TouchEvent ? ev.touches[0] : ev;
  return e ? { x: e.clientX, y: e.clientY } : { x: 0, y: 0 };
};
