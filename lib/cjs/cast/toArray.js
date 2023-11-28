"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = void 0;
const isArray_1 = require("../check/isArray");
const isNil_1 = require("../check/isNil");
exports.toArray = ((v, def = []) => (0, isNil_1.isNil)(v) ? def : (0, isArray_1.isArray)(v) ? v : [v]);
