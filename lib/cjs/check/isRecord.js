"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRecord = void 0;
const isArray_1 = require("./isArray");
const isObject_1 = require("./isObject");
const isRecord = (value) => (0, isObject_1.isObject)(value) && !(0, isArray_1.isArray)(value);
exports.isRecord = isRecord;
