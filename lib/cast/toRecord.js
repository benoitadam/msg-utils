"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRecord = void 0;
const isRecord_1 = require("../check/isRecord");
exports.toRecord = ((v, def = {}) => (0, isRecord_1.isRecord)(v) ? v : def);
