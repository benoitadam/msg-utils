interface ToDate {
    (v: any): Date;
    <TDef>(v: any, defVal: TDef): Date | TDef;
    <TDef>(v: any, defVal?: TDef): Date | TDef | undefined;
}
declare const _default: ToDate;
export default _default;
