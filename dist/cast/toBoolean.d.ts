interface ToBoolean {
    (v: any): boolean | undefined;
    <T>(v: any, defVal: T): boolean | T;
}
declare const _default: ToBoolean;
export default _default;
