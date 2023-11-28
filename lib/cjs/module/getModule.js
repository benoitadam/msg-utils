"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModule = void 0;
const moduleAlias_1 = require("./moduleAlias");
const modules_1 = require("./modules");
const g = globalThis;
const getModule = (key) => {
    let module = modules_1.modules[key];
    if (module)
        return module;
    module = g[key];
    if (module)
        return (modules_1.modules[key] = module);
    if (typeof require !== 'undefined') {
        try {
            module = require(key);
            if (module)
                return (modules_1.modules[key] = module);
        }
        catch (error) { }
    }
    const alias = moduleAlias_1.moduleAlias[key];
    try {
        if (alias) {
            module = typeof alias === 'string' ? (0, exports.getModule)(alias) : alias();
            if (module)
                return (modules_1.modules[key] = module);
        }
    }
    catch (error) {
        console.warn('module alias', key, alias);
    }
    throw new Error(`no module ${key}`);
};
exports.getModule = getModule;
