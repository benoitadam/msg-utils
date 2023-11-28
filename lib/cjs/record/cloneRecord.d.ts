type Writable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare const cloneRecord: <T extends {} = any>(value: T | null | undefined) => Writable<T>;
export {};
