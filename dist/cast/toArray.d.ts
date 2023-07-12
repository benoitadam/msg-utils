interface ToArray {
    <T = any>(v: T[] | T | null | undefined): T[];
    <T = any>(v: any, def: T[]): T[];
}
declare const _default: ToArray;
export default _default;
