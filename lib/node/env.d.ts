interface Env {
    (key: string): string;
    (key: string, cast: null, def: string): string;
    <T = any>(key: string, cast: (value: string) => T | undefined): T;
    <T = any, U = any>(key: string, cast: (value: string) => T | undefined, def: U): T | U;
}
export declare const env: Env;
export {};
