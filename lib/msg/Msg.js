"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Msg = void 0;
const toVoid_1 = require("../cast/toVoid");
const removeItem_1 = require("../array/removeItem");
const isFunction_1 = require("../check/isFunction");
const isNotNull_1 = require("../check/isNotNull");
const debounce_1 = require("../promise/debounce");
const throttle_1 = require("../promise/throttle");
const storage_1 = require("../storage/storage");
class Msg {
    static byKey = {};
    static from(sourceOn, initValue) {
        const target = new Msg(initValue);
        target.sOn = () => sourceOn(target);
        target.sHandler = toVoid_1.toVoid;
        return target;
    }
    static get(key, initValue, isStored) {
        let msg = this.byKey[key];
        if (msg)
            return msg;
        msg = new Msg(initValue, key);
        if (isStored) {
            msg.set(storage_1.storage.get(key, initValue));
            msg.on((val) => storage_1.storage.set(key, val));
        }
        this.byKey[key] = msg;
        return msg;
    }
    key;
    /** Value */
    v;
    /** Handlers */
    h = [];
    /** map and debounce */
    sOn;
    sOff;
    sHandler;
    constructor(initValue, key) {
        this.v = initValue;
        this.key = key;
    }
    get val() {
        return this.get();
    }
    get value() {
        return this.get();
    }
    get() {
        return this.v;
    }
    set(value, ignoreEqual) {
        if (ignoreEqual || value !== this.v) {
            const old = this.v;
            this.v = value;
            this.h.forEach((h) => h(this.v, old));
        }
        return this;
    }
    next(value, ignoreEqual) {
        return this.set((0, isFunction_1.isFunction)(value) ? value(this.v) : value, ignoreEqual);
    }
    subscribe(handler) {
        return { unsubscribe: this.on(handler) };
    }
    pipe(target) {
        target.set(this.v);
        return this.on((val) => target.set(val));
    }
    on(handler) {
        this.h.push(handler);
        if (!this.sOff && this.sOn && this.sHandler)
            this.sOff = this.sOn(this.sHandler);
        return () => this.off(handler);
    }
    off(handler) {
        (0, removeItem_1.removeItem)(this.h, handler);
        if (this.sOff && this.h.length === 0) {
            this.sOff();
            if (this.sOn && this.sHandler)
                delete this.sOff;
        }
    }
    map(cb, sourceHandler) {
        const source = this;
        const target = new Msg(cb(source.v));
        target.sOn = (h) => source.on(h);
        target.sHandler =
            (sourceHandler && sourceHandler(target)) || ((value) => target.set(value));
        return target;
    }
    debounce(ms) {
        return this.map(() => this.v, (target) => (0, debounce_1.debounce)((next) => target.set(next), ms));
    }
    throttle(ms) {
        return this.map(() => this.v, (target) => (0, throttle_1.throttle)((next) => target.set(next), ms));
    }
    toPromise(filter = isNotNull_1.isNotNull) {
        return new Promise((resolve) => {
            if (filter(this.v))
                return resolve(this.v);
            const off = this.on((val) => {
                if (!filter(val))
                    return;
                off();
                resolve(val);
            });
        });
    }
}
exports.Msg = Msg;
