import { setAttrs } from './setAttrs';
import { Style } from './interfaces';

export const setStyle = (el: HTMLElement, style: Style | string, update?: boolean) => {
  if (typeof style === 'string') return setAttrs(el, { style }, true);
  if (!update) setAttrs(el, { style: '' }, true);
  Object.assign(el.style, style);
};
