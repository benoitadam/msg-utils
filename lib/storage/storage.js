"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.Storage = void 0;
const isNil_1 = require("../check/isNil");
const getJson_1 = require("../json/getJson");
const parseJson_1 = require("../json/parseJson");
const module_1 = require("../module/module");
const Store_1 = require("./Store");
class Storage {
    store;
    constructor(store) {
        module_1.moduleFallbacks.localStorage = () => new Store_1.Store();
        this.store = store || (0, module_1.getModule)('localStorage');
    }
    set(key, value) {
        const json = (0, isNil_1.isNil)(value) ? undefined : (0, getJson_1.getJson)(value);
        if ((0, isNil_1.isNil)(json))
            this.store.removeItem(key);
        else
            this.store.setItem(key, json);
    }
    get(key, defVal) {
        return (0, parseJson_1.parseJson)(this.store.getItem(key), defVal);
    }
}
exports.Storage = Storage;
exports.storage = new Storage();
