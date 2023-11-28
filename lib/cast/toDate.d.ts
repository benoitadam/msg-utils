interface ToDate {
    (v: any): Date;
    <TDef>(v: any, defVal: TDef): Date | TDef;
    <TDef>(v: any, defVal?: TDef): Date | TDef | undefined;
}
export declare const toDate: ToDate;
export {};
