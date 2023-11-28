type Writable<T> = {
    -readonly [P in keyof T]: T[P];
};
interface CloneJson {
    <T = any>(v: T): Writable<T> | undefined;
    <T = any>(v: T, defVal: T): Writable<T>;
}
export declare const cloneJson: CloneJson;
export {};
