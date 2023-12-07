"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envJson = exports.envBoolean = exports.envNumber = exports.env = void 0;
const __1 = require("..");
const isDefined_1 = require("../check/isDefined");
exports.env = ((key, undefinedValue) => {
    const value = process.env[key];
    if ((0, isDefined_1.isDefined)(value))
        return value;
    if ((0, isDefined_1.isDefined)(undefinedValue))
        return undefinedValue;
    throw new Error(`env "${key}" is not defined`);
});
const envNumber = (key, undefinedValue) => {
    const value = (0, __1.toNumber)((0, exports.env)(key, undefinedValue), undefined);
    if ((0, isDefined_1.isDefined)(value))
        return value;
    throw new Error(`env "${key}" is not a number`);
};
exports.envNumber = envNumber;
const envBoolean = (key, undefinedValue) => {
    const value = (0, __1.toBoolean)((0, exports.env)(key, undefinedValue), undefined);
    if ((0, isDefined_1.isDefined)(value))
        return value;
    throw new Error(`env "${key}" is not a boolean`);
};
exports.envBoolean = envBoolean;
exports.envJson = ((key, undefinedValue) => {
    const json = (0, exports.env)(key, null);
    const value = json === null ? undefinedValue : (0, __1.parseJson)(json);
    if ((0, isDefined_1.isDefined)(value))
        return value;
    throw new Error(`env "${key}" is not a valid json "${json}" "${value}"`);
});
