"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.words = void 0;
const clean_1 = require("./clean");
const words = (arg) => (0, clean_1.clean)(arg)
    .replace(/[a-z0-9][A-Z]/g, (s) => s[0] + ' ' + s[1].toLowerCase())
    .toLowerCase()
    .trim()
    .split(' ')
    .filter((s) => s);
exports.words = words;
