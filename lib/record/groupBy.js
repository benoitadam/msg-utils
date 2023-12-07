"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueBy = exports.groupBy = void 0;
const isRecord_1 = require("../check/isRecord");
const isArray_1 = require("../check/isArray");
const isFunction_1 = require("../check/isFunction");
const isNil_1 = require("../check/isNil");
const getEntries_1 = require("./getEntries");
const _groupBy = (items, key, val, add) => {
    const getK = (0, isFunction_1.isFunction)(key) ? key : (0, isNil_1.isNil)(key) ? (_, k) => k : (i) => i[key];
    const getV = (0, isFunction_1.isFunction)(val) ? val : (0, isNil_1.isNil)(val) ? (i) => i : (i) => i[val];
    if ((0, isArray_1.isArray)(items)) {
        items.forEach((item, index) => {
            add(getK(item, index), getV(item, index));
        });
    }
    if ((0, isRecord_1.isRecord)(items)) {
        (0, getEntries_1.getEntries)(items).forEach(([key, val]) => {
            add(getK(val, key), getV(val, key));
        });
    }
};
/**
 * @example
 * var a = { x:5 }, b = { x:6 }, c = { x:6 };
 * isEqual( groupBy([ 5, 6, 6 ], v => v), { 5: [5], 6: [6, 6] } );
 * isEqual( groupBy([ 5, 6, 6 ], v => v, (v, i) => i), { 5: [0], 6: [1, 2] } );
 * isEqual( groupBy([ a, b, c ], v => v.x), { 5: [a], 6: [b, c] } );
 * isEqual( groupBy({ a, b, c }, null, v => v.x), { a: [5], b: [6], c: [6] } );
 * isEqual( groupBy([ a, b, c ]), groupBy({ 0:a, 1:b, 2:c }) );
 */
exports.groupBy = ((items, key, val) => {
    const r = {};
    _groupBy(items, key, val, (k, v) => {
        (r[k] || (r[k] = [])).push(v);
    });
    return r;
});
/**
 * @example
 * var a = { x:5 }, b = { x:6 }, c = { x:6 };
 * isEqual( valueBy([ 5, 6, 6 ], v => v), { 5: 5, 6: 6 } );
 * isEqual( valueBy([ 5, 6, 6 ], v => v, (v, i) => i), { 5: 0, 6: 2 } );
 * isEqual( valueBy([ a, b, c ], v => v.x), { 5: a, 6: b } );
 * isEqual( valueBy({ a, b, c }, null, v => v.x), { a: 5, b: 6, c: 6 } );
 * isEqual( valueBy([ a, b, c ]), valueBy({ 0:a, 1:b, 2:c }) );
 */
exports.valueBy = ((items, key, val) => {
    const r = {};
    _groupBy(items, key, val, (k, v) => {
        r[k] = v;
    });
    return r;
});
