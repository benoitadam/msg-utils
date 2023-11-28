import { getModule } from '../module';

export const uuid = () => {
  const { randomUUID, getRandomValues } = getModule('crypto') || {};
  if (randomUUID) return randomUUID();
  if (getRandomValues) {
    var buff = new Uint16Array(8);
    getRandomValues(buff);
    const S = (i: number) => buff[i].toString(16).padStart(4, '0');
    return S(0) + S(1) + '-' + S(2) + '-' + S(3) + '-' + S(4) + '-' + S(5) + S(6) + S(7);
  }
  let h = '0123456789abcdef';
  let k = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  let u = '',
    i = 0,
    rb = (Math.random() * 0xffffffff) | 0;
  while (i++ < 36) {
    var c = k[i - 1],
      r = rb & 0xf,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    u += c == '-' || c == '4' ? c : h[v];
    rb = i % 8 == 0 ? (Math.random() * 0xffffffff) | 0 : rb >> 4;
  }
  return u;
};
