interface Env {
    (key: string): string;
    <T>(key: string, undefinedValue: T): string | T;
}
export declare const env: Env;
export declare const envNumber: (key: string, undefinedValue?: number) => number;
export declare const envBoolean: (key: string, undefinedValue?: boolean) => boolean;
interface EnvJson {
    <T = any>(key: string): T;
    <T = any>(key: string, undefinedValue: T): T;
}
export declare const envJson: EnvJson;
export {};
