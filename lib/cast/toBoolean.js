"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBoolean = void 0;
const isNil_1 = require("../check/isNil");
const isString_1 = require("../check/isString");
exports.toBoolean = ((v, defVal) => (0, isString_1.isString)(v)
    ? ['true', 'ok', 'on', '1'].indexOf(String(v).toLowerCase()) !== -1
    : (0, isNil_1.isNil)(v)
        ? defVal
        : !!v);
