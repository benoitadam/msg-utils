import { isObject } from "../check/isObject";
import { isArray } from "../check/isArray";
import { uniq } from "../array/uniq";
import { getKeys } from "./getKeys";

export const getChanges = (source: any, target: any): any => {
    if (source === target) return undefined;
    if (!isObject(source) || !isObject(target) || isArray(source) || isArray(target)) return target;
    const result: any = {};
    const allKeys = uniq([...getKeys(source), ...getKeys(target)]);
    if (allKeys.length === 0) return undefined;
    for (const key of allKeys) {
        const sourceChild = source[key];
        const targetChild = target[key];
        if (sourceChild === targetChild) continue;
        if (targetChild === undefined) {
            result[key] = undefined;
            continue;
        }
        const changes = getChanges(sourceChild, targetChild);
        if (changes === undefined) continue;
        result[key] = changes;
    }
    return result;
};
