interface ToBoolean {
    (v: any): boolean | undefined;
    <T>(v: any, defVal: T): boolean | T;
}
export declare const toBoolean: ToBoolean;
export {};
