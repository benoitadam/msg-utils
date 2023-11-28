"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bounds = void 0;
const isNumber_1 = require("../check/isNumber");
const bounds = (val, min, max) => (0, isNumber_1.isNumber)(min) && val < min ? min : (0, isNumber_1.isNumber)(max) && val > max ? max : val;
exports.bounds = bounds;
