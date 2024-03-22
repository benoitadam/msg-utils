"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vFieldEl = exports.vFieldFrom = exports.VField = void 0;
const toVoid_1 = require("../cast/toVoid");
const isString_1 = require("../check/isString");
const setTemplate_1 = require("../string/setTemplate");
const addEl_1 = require("./addEl");
const setCss_1 = require("./setCss");
const setEl_1 = require("./setEl");
const css = `
.{c} { display: flex; flex-direction: column; align-items: stretch; }
.{c}_label {}
.{c}_input { border: 1px solid gray; border-radius: 5px; padding: 5px 10px; margin: 5px 0; }`;
class VField {
    constructor(options) {
        this.options = options;
        const { cls, type, name, label, input, onChange } = options;
        this.onChange = onChange || toVoid_1.toVoid;
        const c = cls || 'vFld';
        (0, setCss_1.setCss)(c, (0, setTemplate_1.setTemplate)(css, { c }));
        VField.count++;
        const id = name || c + VField.count;
        const el = (this.el = (0, setEl_1.setEl)('div', { cls: c }));
        el._vField = this;
        const labelEl = (0, setEl_1.setEl)('label', {
            cls: c + '_label',
            for: id,
            ...((0, isString_1.isString)(label) ? { innerHTML: label } : label),
        });
        const inputEl = (0, setEl_1.setEl)('input', {
            cls: c + '_input',
            id,
            name: id,
            type,
            ...input,
        });
        this.labelEl = labelEl;
        this.inputEl = inputEl;
        inputEl.onchange = this._onChange.bind(this);
        (0, addEl_1.addEl)(el, labelEl, inputEl);
    }
    _onChange(ev) {
        this.onChange(this, ev);
    }
    getValue() {
        return this.inputEl.value;
    }
    setValue(value) {
        this.inputEl.value = value;
    }
}
exports.VField = VField;
VField.count = 0;
const vFieldFrom = (o) => o instanceof VField
    ? o
    : o instanceof HTMLElement
        ? o._vField
        : new VField(o);
exports.vFieldFrom = vFieldFrom;
const vFieldEl = (o) => o instanceof HTMLElement ? o : (0, exports.vFieldFrom)(o).el;
exports.vFieldEl = vFieldEl;
