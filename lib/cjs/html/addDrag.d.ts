import { Drag } from './interfaces';
export declare const addDrag: (el: HTMLElement, o: {
    onStart?: 0 | ((Drag: Drag) => any) | null | undefined;
    onMove?: 0 | ((Drag: Drag) => any) | null | undefined;
    onStop?: 0 | ((Drag: Drag) => any) | null | undefined;
}) => Drag;
