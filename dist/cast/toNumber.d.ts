interface ToNumber {
    (v: any): number | undefined;
    <D>(v: any, nanVal: D): number | D;
}
declare const _default: ToNumber;
export default _default;
