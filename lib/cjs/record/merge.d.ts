export interface Merge {
    <T>(target: T, changes: T | Partial<T>): T;
}
export declare const merge: Merge;
