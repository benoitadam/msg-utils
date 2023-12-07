"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwIf = void 0;
const isArray_1 = require("./isArray");
const isFunction_1 = require("./isFunction");
const throwIf = (value, check, errorMessage) => {
    if ((0, isFunction_1.isFunction)(check) ? check(value) : check)
        return value;
    throw new Error((0, isArray_1.isArray)(errorMessage) ? errorMessage.join('') : errorMessage);
};
exports.throwIf = throwIf;
