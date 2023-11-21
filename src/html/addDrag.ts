
import { toVoid } from "../cast/toVoid";
import { addListener } from "./addListener";

export type DragEvent = 
    HTMLElementEventMap['touchstart']|
    HTMLElementEventMap['touchmove']|
    HTMLElementEventMap['touchend']|
    HTMLElementEventMap['mousedown']|
    HTMLElementEventMap['mousemove']|
    HTMLElementEventMap['mouseup']

export interface DragPos {
    x: number;
    y: number;
}

export type Drag = {
    e?: DragEvent;
    el: HTMLElement;
    x0: number;
    y0: number;
    x: number;
    y: number;
    dX0: number;
    dY0: number;
    dX: number;
    dY: number;
    dispose: () => void;
}

const getPos = (ev: DragEvent) => {
    const e = ev instanceof TouchEvent ? ev.touches[0] : ev;
    return e ? { x: e.clientX, y: e.clientY, ev } : { x:0, y:0, ev };
}

export const addDrag = (
    el: HTMLElement,
    o: {
        onStart?: ((Drag: Drag) => any)|null|0,
        onMove?: ((Drag: Drag) => any)|null|0,
        onStop?: ((Drag: Drag) => any)|null|0,
    }
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

    const onMove = (ev: DragEvent) => {
        ev.preventDefault();
        const { x, y } = getPos(ev);
        d.x = x;
        d.y = y;        
        d.dX = d.dX0 + d.x - d.x0;
        d.dY = d.dY0 + d.y - d.y0;
        if (o.onMove) o.onMove(d);
    };
    
    const onStart = (ev: DragEvent) => {
        ev.preventDefault();
        if (o.onMove) {
            dMMove();
            dTMove();
            dMMove = addListener(0, 'mousemove', onMove);
            dTMove = addListener(0, 'touchmove', onMove);
        }
        d.dX0 = d.dX;
        d.dY0 = d.dY;
        const { x, y } = getPos(ev);
        d.x0 = d.x = x;
        d.y0 = d.y = y;
        dUp();
        dUp = addListener(0, 'mouseup', onStop);
        if (o.onStart) o.onStart(d);
    };

    const onStop = (ev: DragEvent) => {
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
}