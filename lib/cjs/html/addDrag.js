"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDrag = void 0;
const toVoid_1 = require("../cast/toVoid");
const addListener_1 = require("./addListener");
const getEventXY_1 = require("./getEventXY");
const addDrag = (el, o) => {
    const d = {
        el,
        x0: 0,
        y0: 0,
        x: 0,
        y: 0,
        dX0: 0,
        dY0: 0,
        dX: 0,
        dY: 0,
        dispose: toVoid_1.toVoid,
    };
    let dMMove = toVoid_1.toVoid;
    let dTMove = toVoid_1.toVoid;
    let dUp = toVoid_1.toVoid;
    const onMove = (ev) => {
        ev.preventDefault();
        const { x, y } = (0, getEventXY_1.getEventXY)(ev);
        d.x = x;
        d.y = y;
        d.dX = d.dX0 + d.x - d.x0;
        d.dY = d.dY0 + d.y - d.y0;
        if (o.onMove)
            o.onMove(d);
    };
    const onStart = (ev) => {
        ev.preventDefault();
        if (o.onMove) {
            dMMove();
            dTMove();
            dMMove = (0, addListener_1.addListener)(0, 'mousemove', onMove);
            dTMove = (0, addListener_1.addListener)(0, 'touchmove', onMove);
        }
        d.dX0 = d.dX;
        d.dY0 = d.dY;
        const { x, y } = (0, getEventXY_1.getEventXY)(ev);
        d.x0 = d.x = x;
        d.y0 = d.y = y;
        dUp();
        dUp = (0, addListener_1.addListener)(0, 'mouseup', onStop);
        if (o.onStart)
            o.onStart(d);
    };
    const onStop = (ev) => {
        onMove(ev);
        dMMove();
        dTMove();
        if (o.onStop)
            o.onStop(d);
    };
    const dDown = (0, addListener_1.addListener)(el, 'mousedown', onStart);
    const dStart = (0, addListener_1.addListener)(el, 'touchstart', onStart);
    d.dispose = () => {
        dDown();
        dStart();
        dUp();
        dMMove();
        dTMove();
    };
    return d;
};
exports.addDrag = addDrag;
