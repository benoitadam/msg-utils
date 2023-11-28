"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rand = void 0;
const rand = (min, max) => Math.random() * (max - min) + min;
exports.rand = rand;
