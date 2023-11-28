"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = void 0;
const isNil_1 = require("../check/isNil");
const toString = (v, def = '') => ((0, isNil_1.isNil)(v) ? def : String(v));
exports.toString = toString;
