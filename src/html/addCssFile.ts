const map: Record<string, HTMLLinkElement> = {};

export const addCssFile = (url: string): HTMLLinkElement => {
  if (map[url]) return map[url];
  const el = document.createElement('link');
  el.rel = 'stylesheet';
  el.type = 'text/css';
  el.href = url;
  map[url] = document.head.appendChild(el);
  return el;
}