"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttrs = void 0;
const fromEntries_1 = require("../record/fromEntries");
const getAttrs = (el) => (0, fromEntries_1.fromEntries)(el.getAttributeNames().map((name) => [name, el.getAttribute(name)]));
exports.getAttrs = getAttrs;
