"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneJson = void 0;
const parseJson_1 = require("./parseJson");
const getJson_1 = require("./getJson");
exports.cloneJson = ((v, defVal) => (0, parseJson_1.parseJson)((0, getJson_1.getJson)(v), defVal));
