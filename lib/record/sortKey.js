"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortKey = void 0;
const entries_1 = require("./entries");
const fromEntries_1 = require("./fromEntries");
const sortKey = (record) => (0, fromEntries_1.fromEntries)((0, entries_1.entries)(record).sort((a, b) => a[0].localeCompare(b[0])));
exports.sortKey = sortKey;
