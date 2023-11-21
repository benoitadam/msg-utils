import { ElOptions } from './interfaces';
import { setAttrs } from './setAttrs';
import { setStyle } from './setStyle';
import { setCls } from './setCls';

export const setEl = (el: HTMLElement | keyof HTMLElementTagNameMap, options?: ElOptions) => {
  if (typeof el === 'string') el = document.createElement(el) as HTMLElement;
  if (!options) return el;

  const { reset, attrs, style, cls, children, ...rest } = options;

  if (reset) setAttrs(el, {});
  if (attrs) setAttrs(el, attrs, true);
  if (style) setStyle(el, style, true);
  if (cls) setCls(el, cls, true);

  Object.assign(el, rest);

  if (children) for (const childEl of children) el.appendChild(childEl);

  return el;
};
