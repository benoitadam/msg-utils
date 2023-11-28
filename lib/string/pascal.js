"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascal = void 0;
const firstUpper_1 = require("./firstUpper");
const words_1 = require("./words");
const pascal = (arg) => (0, words_1.words)(arg).map(firstUpper_1.firstUpper).join('');
exports.pascal = pascal;
