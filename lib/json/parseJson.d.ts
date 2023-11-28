interface ParseJson {
    <T = any>(v: any): T | undefined;
    <T = any, U = any>(v: any, def: U): T | U;
}
export declare const parseJson: ParseJson;
export {};
