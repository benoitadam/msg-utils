"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCls = void 0;
const fromKeys_1 = require("../record/fromKeys");
const getCls = (el) => (0, fromKeys_1.fromKeys)(el.className.split(' '));
exports.getCls = getCls;
