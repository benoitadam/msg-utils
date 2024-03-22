import { toVoid } from '../cast/toVoid';
import { isString } from '../check/isString';
import { setTemplate } from '../string/setTemplate';
import { addEl } from './addEl';
import { ElOptions } from './interfaces';
import { setCss } from './setCss';
import { setEl } from './setEl';

export type VFieldType = 'email' | 'text' | 'number';

export interface VFieldOptions {
  readonly cls?: string;
  readonly type?: VFieldType;
  readonly name?: string;
  readonly label?: ElOptions | string;
  readonly input?: ElOptions;
  readonly onChange?: (field: VField, ev: Event) => void;
}

const css = `
.{c} { display: flex; flex-direction: column; align-items: stretch; }
.{c}_label {}
.{c}_input { border: 1px solid gray; border-radius: 5px; padding: 5px 10px; margin: 5px 0; }`;

export class VField {
  static count = 0;

  options: VFieldOptions;

  el: HTMLElement;
  labelEl: HTMLLabelElement;
  inputEl: HTMLInputElement;
  onChange: (field: VField, ev: Event) => void;

  constructor(options: VFieldOptions) {
    this.options = options;
    const { cls, type, name, label, input, onChange } = options;

    this.onChange = onChange || toVoid;

    const c = cls || 'vFld';
    setCss(c, setTemplate(css, { c }));

    VField.count++;
    const id = name || c + VField.count;

    const el = (this.el = setEl('div', { cls: c }));
    (el as any)._vField = this;

    const labelEl = setEl('label', {
      cls: c + '_label',
      for: id,
      ...(isString(label) ? { innerHTML: label } : label),
    } as any) as HTMLLabelElement;
    const inputEl = setEl('input', {
      cls: c + '_input',
      id,
      name: id,
      type,
      ...input,
    } as any) as HTMLInputElement;

    this.labelEl = labelEl;
    this.inputEl = inputEl;

    inputEl.onchange = this._onChange.bind(this);

    addEl(el, labelEl, inputEl);
  }

  _onChange(ev: Event) {
    this.onChange(this, ev);
  }

  getValue() {
    return this.inputEl.value;
  }

  setValue(value: string) {
    this.inputEl.value = value;
  }
}

export const vFieldFrom = (o: VFieldOptions | HTMLElement | VField) =>
  o instanceof VField
    ? o
    : o instanceof HTMLElement
    ? ((o as any)._vField as VField)
    : new VField(o);

export const vFieldEl = (o: VFieldOptions | HTMLElement | VField) =>
  o instanceof HTMLElement ? o : vFieldFrom(o).el;
