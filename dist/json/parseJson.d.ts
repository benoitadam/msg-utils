interface ParseJson {
    <T = any>(v: any): T | undefined;
    <T = any, U = any>(v: any, def: U): T | U;
}
declare const _default: ParseJson;
export default _default;
