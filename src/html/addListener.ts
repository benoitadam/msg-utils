export const addListener = <K extends keyof HTMLElementEventMap>(
    element: HTMLElement|0,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
): () => void => {
    const el = element === 0 ? document.body : element;
    el.addEventListener(type, listener, options);
    return () => el.removeEventListener(type, listener);
}