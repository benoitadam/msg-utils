export const htmlToEl = (html: string) => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.children[0];
};
