interface GetJson {
    (v: any): string | undefined;
    <T = any>(v: any, defVal: T, indented?: boolean): string | T;
}
export declare const getJson: GetJson;
export {};
