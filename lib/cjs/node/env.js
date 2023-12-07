"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const isDefined_1 = require("../check/isDefined");
exports.env = ((key, cast, undefinedValue) => {
    const value = process.env[key];
    const result = cast ? cast(value) : value;
    if ((0, isDefined_1.isDefined)(result))
        return result;
    if ((0, isDefined_1.isDefined)(undefinedValue))
        return undefinedValue;
    throw new Error(`env "${key}" is not correct`);
});
