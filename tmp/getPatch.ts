// import { isArray, isObject } from "..";
// import { isRecord } from "../check/isRecord";
// import { JsonPatch } from "./interfaces";

// export interface GetPatch {
//     <T>(source: T, target: T): JsonPatch;
// }

// const calcPatch = (source: any, target: any, base: string, result: JsonPatch) => {
//     if (source === target) {
//         return;
//     }
    
//     if (!isObject(source) || !isObject(target) || (isArray(source) !== isArray(target))) {
//         return result.push({ o: 'set', p: base, v: target });
//     }
    
//     if (isArray(source)) {
//         if (!isArray(target)) return result.push({ o: 'set', p: base, v: target });
//         for (let i=0,l=source.length; i<l; i++) {
//             const sourceChild = source[i];
//             const targetChild = target[i];
//             if (sourceChild !== targetChild) {
//                 if ()

//                 calcPatch(sourceChild, targetChild, base + '/' + i, result);
//             }
//         }
//     }


    
//     if (!isRecord(target) || !isRecord(changes)) return changes;
//     const keys = Object.keys(changes);
//     for (const key of keys) {
//         const v = changes[key];
//         if (v === undefined) {
//             delete target[key];
//             continue;
//         }
//         target[key] = merge(target[key], v);
//     }
//     return target;
// }

// export const getPatch = (source: any, target: any): JsonPatch => {
//     const result: JsonPatch = [];
//     calcPatch(source, target, '', result);
//     return result;
// };
