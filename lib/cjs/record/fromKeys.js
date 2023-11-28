"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromKeys = void 0;
const fromEntries_1 = require("./fromEntries");
const fromKeys = (keys) => (0, fromEntries_1.fromEntries)(keys.map((k) => [k, true]));
exports.fromKeys = fromKeys;
