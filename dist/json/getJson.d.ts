interface GetJson {
    (v: any): string | undefined;
    <T = any>(v: any, defVal: T, indented?: boolean): string | T;
}
declare const _default: GetJson;
export default _default;
