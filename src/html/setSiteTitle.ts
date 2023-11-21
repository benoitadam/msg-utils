export const setSiteTitle = (title: string) => {
  const titleEl = document.getElementsByTagName('title')[0];
  if (titleEl) titleEl.innerText = title;
  document.title = title;
};
