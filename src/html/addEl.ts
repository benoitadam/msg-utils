export const addEl = (containerEl: HTMLElement, ...els: (HTMLElement|undefined|null|false)[]) => {
    for (const el of els) el && containerEl.appendChild(el);
}