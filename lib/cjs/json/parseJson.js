"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = void 0;
const __1 = require("..");
const tryCatch_1 = require("../cast/tryCatch");
exports.parseJson = ((v, def) => (0, tryCatch_1.tryCatch)(() => (0, __1.isNotNull)(v) ? JSON.parse(v) : def, def));
