/**
 * @param val
 * @param replaceBySearch
 * @returns
 * @example replace("toto tututoto b!", { toto: 5, b: 'ok' }) => "5 tutu5 ok!"
 */
export const replace = (val: string, replaceBySearch: Record<string, any>): string => {
  val = String(val);
  if ((val as any).replaceAll) {
    for (const key in replaceBySearch)
      val = (val as any).replaceAll(key, replaceBySearch[key] as string);
    return val;
  }
  for (const key in replaceBySearch)
    val = val.replace(
      new RegExp(key.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'),
      replaceBySearch[key],
    );
  return val;
};

// interface ReplaceAll {
//   /**
//    * replaceAll("toto tututoto b!", { toto: 5, b: 'ok' }) => "5 tutu5 ok!"
//    */
//   (val: string, replaceByKey: Record<string, any>): string;

//   /**
//    * replaceAll("toto tututoto b!", "toto", "ok") => "ok tutuok b!"
//    */
//   (val: string, search: string | RegExp, replace: string): string;
// }

// export const replace = (
//   (val: string, search: Record<string, any>): string =>
//     search instanceof RegExp || isString(search) ? (
//       (val as any).replaceAll
//         ? (val as any).replaceAll(search, replace)
//         : search instanceof RegExp
//           ? val.replace(search, replace!)
//           : val.replace(new RegExp(search, 'g'), replace!)
//     ) : _replaceByKey(val, search)
// ) as ReplaceAll;

// // import { replaceAll } from './replaceAll';

// // /**
// //  * @param val
// //  * @param replaceByKey
// //  * @returns
// //  * @example replaceByKey("toto tututoto b!", { toto: 5, b: 'ok' }) => "5 tutu5 ok!"
// //  */
// // export const replaceByKey = (val: string, replaceByKey: Record<string, any>): string => {
// //   for (const key in replaceByKey) val = replaceAll(val, key, replaceByKey[key]);
// //   return val;
// // };

// import { replaceAll } from './replaceAll';

// /**
//  * @param val
//  * @param replaceByKey
//  * @returns
//  * @example replaceByKey("toto tututoto b!", { toto: 5, b: 'ok' }) => "5 tutu5 ok!"
//  */
// export const replaceByKey = (val: string, replaceByKey: Record<string, any>): string => {
//   for (const key in replaceByKey) val = replaceAll(val, key, replaceByKey[key]);
//   return val;
// };
