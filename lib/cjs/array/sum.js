"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = void 0;
const sum = (list, margin) => {
    let r = 0;
    for (const n of list)
        r += n;
    return r + (list.length - 1) * (margin || 0);
};
exports.sum = sum;
