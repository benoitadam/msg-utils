interface TryCatch {
    <T = any>(v: () => any): T | undefined;
    <T = any, U = any>(v: () => any, def: U): T | U;
}
declare const _default: TryCatch;
export default _default;
