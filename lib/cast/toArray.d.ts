interface ToArray {
    <T = any>(v: T[] | T | null | undefined): T[];
    <T = any>(v: any, def: T[]): T[];
}
export declare const toArray: ToArray;
export {};
