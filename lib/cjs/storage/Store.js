"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
class Store {
    constructor() {
        this.data = {};
    }
    getItem(key) {
        return this.data[key] || null;
    }
    removeItem(key) {
        delete this.data[key];
        this.save && this.save(this);
    }
    setItem(key, val) {
        this.data[key] = val;
        this.save && this.save(this);
    }
}
exports.Store = Store;
