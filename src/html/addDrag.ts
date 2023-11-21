import { toVoid } from '../cast/toVoid';
import { addListener } from './addListener';
import { getEventXY } from './getEventXY';
import { Drag, MouseOrTouchEvent } from './interfaces';

export const addDrag = (
  el: HTMLElement,
  o: {
    onStart?: ((Drag: Drag) => any) | null | 0;
    onMove?: ((Drag: Drag) => any) | null | 0;
    onStop?: ((Drag: Drag) => any) | null | 0;
  },
): Drag => {
  const d: Drag = {
    el,
    x0: 0,
    y0: 0,
    x: 0,
    y: 0,
    dX0: 0,
    dY0: 0,
    dX: 0,
    dY: 0,
    dispose: toVoid,
  };

  let dMMove = toVoid;
  let dTMove = toVoid;
  let dUp = toVoid;

  const onMove = (ev: MouseOrTouchEvent) => {
    ev.preventDefault();
    const { x, y } = getEventXY(ev);
    d.x = x;
    d.y = y;
    d.dX = d.dX0 + d.x - d.x0;
    d.dY = d.dY0 + d.y - d.y0;
    if (o.onMove) o.onMove(d);
  };

  const onStart = (ev: MouseOrTouchEvent) => {
    ev.preventDefault();
    if (o.onMove) {
      dMMove();
      dTMove();
      dMMove = addListener(0, 'mousemove', onMove);
      dTMove = addListener(0, 'touchmove', onMove);
    }
    d.dX0 = d.dX;
    d.dY0 = d.dY;
    const { x, y } = getEventXY(ev);
    d.x0 = d.x = x;
    d.y0 = d.y = y;
    dUp();
    dUp = addListener(0, 'mouseup', onStop);
    if (o.onStart) o.onStart(d);
  };

  const onStop = (ev: MouseOrTouchEvent) => {
    onMove(ev);
    dMMove();
    dTMove();
    if (o.onStop) o.onStop(d);
  };

  const dDown = addListener(el, 'mousedown', onStart);
  const dStart = addListener(el, 'touchstart', onStart);

  d.dispose = () => {
    dDown();
    dStart();
    dUp();
    dMMove();
    dTMove();
  };

  return d;
};
