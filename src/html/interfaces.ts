export type Cls = Record<string, boolean | number | undefined | null>;

export type Style = Partial<CSSStyleDeclaration>;

export type ElOptions = Omit<Omit<Partial<HTMLDivElement>, 'children'>, 'style'> & {
    readonly reset?: boolean;
    readonly cls?: Cls|string;
    readonly style?: Style;
    readonly attrs?: Record<string, any>;
    readonly children?: HTMLElement[];
}