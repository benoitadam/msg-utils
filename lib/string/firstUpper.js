"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstUpper = void 0;
const firstUpper = (arg) => arg ? arg[0].toUpperCase() + arg.substring(1) : arg;
exports.firstUpper = firstUpper;
