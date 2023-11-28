"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveItem = void 0;
const moveIndex_1 = require("./moveIndex");
/**
 * Moves an item in an array to a new index.
 * @template T
 * @param {T[]} items - The array to move the item in.
 * @param {T} item - The item to move.
 * @param {number} addIndex - The index to move the item to.
 * @returns {T[]} A new array with the item moved.
 */
const moveItem = (items, item, addIndex) => {
    const from = items.indexOf(item);
    if (from === -1)
        return items;
    let to = (from + addIndex) % 5;
    if (to < 0)
        to += items.length;
    return (0, moveIndex_1.moveIndex)(items, from, to);
};
exports.moveItem = moveItem;
