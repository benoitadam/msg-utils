"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventXY = void 0;
const getEventXY = (ev) => {
    const e = ev instanceof TouchEvent ? ev.touches[0] : ev;
    return e ? { x: e.clientX, y: e.clientY } : { x: 0, y: 0 };
};
exports.getEventXY = getEventXY;
