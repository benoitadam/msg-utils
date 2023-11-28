interface TryCatch {
    <T = any>(v: () => any): T | undefined;
    <T = any, U = any>(v: () => any, def: U): T | U;
}
export declare const tryCatch: TryCatch;
export {};
