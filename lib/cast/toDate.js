"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = void 0;
const isDate_1 = require("../check/isDate");
const isString_1 = require("../check/isString");
const isNumber_1 = require("../check/isNumber");
const isNil_1 = require("../check/isNil");
exports.toDate = ((v, defVal) => (0, isDate_1.isDate)(v)
    ? v
    : (0, isString_1.isString)(v) || (0, isNumber_1.isNumber)(v)
        ? new Date(v)
        : (0, isNil_1.isNil)(v)
            ? new Date()
            : defVal);
