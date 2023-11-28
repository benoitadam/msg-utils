"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const str_1 = require("../cast/str");
const isString_1 = require("../check/isString");
const sort = (items, prop = str_1.str) => items.sort((a, b) => {
    const pA = prop(a);
    const pB = prop(b);
    return (0, isString_1.isString)(pA) || (0, isString_1.isString)(pB)
        ? String(pA).localeCompare(String(pB))
        : Number(pA) - Number(pB);
});
exports.sort = sort;
