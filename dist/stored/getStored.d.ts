interface GetStored {
    <T = any>(key: string): T | undefined;
    <T = any>(key: string, defVal?: T): T;
}
declare const _default: GetStored;
export default _default;
