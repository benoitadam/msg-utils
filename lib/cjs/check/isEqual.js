"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqual = void 0;
const getJson_1 = require("../json/getJson");
const isRecord_1 = require("./isRecord");
const isEqual = (a, b) => {
    if (a === b)
        return true;
    if (typeof a !== typeof b)
        return false;
    if (Array.isArray(a)) {
        if (!Array.isArray(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0, l = a.length; i < l; i++)
            if (!(0, exports.isEqual)(a[i], b[i]))
                return false;
        return true;
    }
    if (a instanceof Object) {
        if (!(0, isRecord_1.isRecord)(b))
            return false;
        if (Object.keys(a).length !== Object.keys(b).length)
            return false;
        for (const prop in a)
            if (!(0, exports.isEqual)(a[prop], b[prop]))
                return false;
        return true;
    }
    return (0, getJson_1.getJson)(a) === (0, getJson_1.getJson)(b);
};
exports.isEqual = isEqual;
