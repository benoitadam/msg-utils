interface ToRecord {
    <T = any>(v: T | null | undefined): T | Partial<T>;
    <T = any, U = any>(v: T | null | undefined, def: U): T | U;
}
declare const _default: ToRecord;
export default _default;
