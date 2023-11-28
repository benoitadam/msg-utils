"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNumber = void 0;
const isString_1 = require("../check/isString");
exports.toNumber = ((v, nanVal) => {
    const clean = (0, isString_1.isString)(v) ? v.replace(/,/g, '.').replace(/[^0-9\-\.]/g, '') : String(v);
    const nbr = clean !== '' ? Number(clean) : Number.NaN;
    return Number.isNaN(nbr) || !Number.isFinite(nbr) ? nanVal : nbr;
});
