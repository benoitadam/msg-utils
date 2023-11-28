"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstLower = void 0;
const firstLower = (arg) => arg ? arg[0].toLowerCase() + arg.substring(1) : arg;
exports.firstLower = firstLower;
