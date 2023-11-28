"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMsg = void 0;
const module_1 = require("../module");
exports.useMsg = ((msg) => {
    const react = (0, module_1.getModule)('react');
    const setState = react.useState(0)[1];
    react.useEffect(() => msg === null || msg === void 0 ? void 0 : msg.on(() => setState((i) => i + 1)), [msg]);
    return msg ? msg.get() : undefined;
});
