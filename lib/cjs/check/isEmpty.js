"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
const isArray_1 = require("./isArray");
const isEmptyRecord_1 = require("./isEmptyRecord");
const isEmpty = (value) => !value || ((0, isArray_1.isArray)(value) ? value.length === 0 : (0, isEmptyRecord_1.isEmptyRecord)(value));
exports.isEmpty = isEmpty;
