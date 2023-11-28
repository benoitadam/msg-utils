"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniq = void 0;
const getJson_1 = require("../json/getJson");
const groupBy_1 = require("../record/groupBy");
const uniq = (arr) => Object.values((0, groupBy_1.valueBy)(arr, (v) => (0, getJson_1.getJson)(v)));
exports.uniq = uniq;
