"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = void 0;
const getJson_1 = require("../json/getJson");
const storage_1 = require("../storage/storage");
const copy = async (value) => {
    storage_1.storage.set('__copy', value);
    try {
        await navigator.clipboard.writeText((0, getJson_1.getJson)(value, ''));
    }
    catch (e) { }
};
exports.copy = copy;
