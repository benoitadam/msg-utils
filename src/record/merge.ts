import { isRecord } from "../check/isRecord";
import { getKeys } from "./getKeys";

export interface Merge {
    <T>(target: T, changes: T | Partial<T>): T;
}

export const merge = ((target: any, changes: any): any => {
    if (!isRecord(target) || !isRecord(changes)) return changes;
    const keys = getKeys(changes);
    for (const key of keys) {
        const v = changes[key];
        if (v === undefined) {
            delete target[key];
            continue;
        }
        target[key] = merge(target[key], v);
    }
    return target;
}) as Merge;
