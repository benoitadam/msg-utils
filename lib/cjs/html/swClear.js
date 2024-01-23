"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swClear = void 0;
const swClear = () => navigator.serviceWorker
    .getRegistrations()
    .then((rs) => Promise.all(rs.map((r) => r.unregister())));
exports.swClear = swClear;
