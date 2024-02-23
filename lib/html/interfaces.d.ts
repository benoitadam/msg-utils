export type Cls = Record<string, boolean | number | undefined | null>;
export type Style = Partial<CSSStyleDeclaration>;
export type HTMLAllElement = HTMLDivElement & HTMLInputElement & HTMLVideoElement & HTMLImageElement & HTMLHeadingElement;
export type ElOptions = Omit<Omit<Partial<HTMLAllElement>, 'children'>, 'style'> & {
    readonly reset?: boolean;
    readonly cls?: Cls | string;
    readonly style?: Style;
    readonly attrs?: Record<string, any>;
    readonly children?: HTMLElement[];
    readonly ctn?: string;
};
export type MouseOrTouchEvent = HTMLElementEventMap['touchstart'] | HTMLElementEventMap['touchmove'] | HTMLElementEventMap['touchend'] | HTMLElementEventMap['mousedown'] | HTMLElementEventMap['mousemove'] | HTMLElementEventMap['mouseup'];
export interface EventXY {
    x: number;
    y: number;
}
export type Drag = {
    e?: DragEvent;
    el: HTMLElement;
    x0: number;
    y0: number;
    x: number;
    y: number;
    dX0: number;
    dY0: number;
    dX: number;
    dY: number;
    dispose: () => void;
};
