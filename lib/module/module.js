"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModule = exports._require = exports.moduleFallbacks = exports.modules = void 0;
const g = globalThis;
exports.modules = {};
exports.moduleFallbacks = {
    XMLHttpRequest: 'xmlhttprequest-ssl',
    fetch: 'node-fetch',
    react: 'React',
};
const _require = (key) => require(key);
exports._require = _require;
const getModule = (key) => {
    let module = exports.modules[key];
    if (module)
        return module;
    module = g[key];
    if (module)
        return (exports.modules[key] = module);
    try {
        module = (0, exports._require)(key);
        if (module)
            return (exports.modules[key] = module);
    }
    catch (error) { }
    const fallback = exports.moduleFallbacks[key];
    try {
        if (fallback) {
            module = typeof fallback === 'string' ? (0, exports.getModule)(fallback) : fallback();
            if (module)
                return (exports.modules[key] = module);
        }
    }
    catch (error) {
        console.warn('module fallback', key, fallback);
    }
    throw new Error(`no module ${key}`);
};
exports.getModule = getModule;
