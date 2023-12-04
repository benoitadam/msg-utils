"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
const isFunction_1 = require("../check/isFunction");
exports.tryCatch = ((funOrVal, catchOrVal) => {
    try {
        return (0, isFunction_1.isFunction)(funOrVal) ? funOrVal() : funOrVal;
    }
    catch (error) {
        return (0, isFunction_1.isFunction)(catchOrVal) ? catchOrVal(error) : catchOrVal;
    }
});
