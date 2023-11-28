"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = void 0;
const round = (value, decimal) => {
    const x = Math.pow(10, decimal || 0);
    return Math.round(value * x) / x;
};
exports.round = round;
