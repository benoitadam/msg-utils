"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRecord = void 0;
const isRecord = (value) => value instanceof Object && !Array.isArray(value);
exports.isRecord = isRecord;
