interface TryCatch {
    <T = any>(funOrVal: T | (() => T)): T | undefined;
    <T = any, U = any>(funOrVal: T | (() => T), catchOrVal: U | (() => U)): T | U;
}
export declare const tryCatch: TryCatch;
export {};
