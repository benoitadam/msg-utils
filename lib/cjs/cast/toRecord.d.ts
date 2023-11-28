interface ToRecord {
    <T = any>(v: T | null | undefined): T | Partial<T>;
    <T = any, U = any>(v: T | null | undefined, def: U): T | U;
}
export declare const toRecord: ToRecord;
export {};
