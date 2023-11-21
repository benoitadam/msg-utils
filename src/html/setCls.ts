import { Cls } from './interfaces';

export const setCls = (el: Element, cls: Cls | string, update?: boolean) => {
  if (typeof cls === 'string') {
    el.className = cls;
    return;
  }
  if (!update) el.className = '';
  const list = el.classList;
  for (const name in cls) {
    const isAdd = cls[name];
    isAdd ? list.add(name) : list.remove(name);
  }
};
