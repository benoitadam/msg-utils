export const setAttrs = (el: Element, attrs: Record<string, any>, update?: boolean) => {
  if (!update) for (const a of el.attributes) el.removeAttribute(a.name);
  for (const n in attrs) el.setAttribute(n, attrs[n]);
}
