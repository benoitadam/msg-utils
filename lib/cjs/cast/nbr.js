"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nbr = void 0;
const toNumber_1 = require("./toNumber");
/**
 * nbr('a') -> 0
 * nbr({}) -> 0
 * nbr('5x') -> 5
 * nbr(10) -> 10
 * nbr(3.5) -> 3.5
 * nbr('3.5') -> 3.5
 * nbr('3,5') -> 3.5
 * @param v
 * @returns
 */
const nbr = (v) => (0, toNumber_1.toNumber)(v, 0);
exports.nbr = nbr;
