"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
const isNil_1 = require("../check/isNil");
exports.range = ((min, max) => {
    if (!(0, isNil_1.isNil)(max))
        return (0, exports.range)(max - min + 1).map((i) => i + min);
    return Array.from(Array(min).keys());
});
