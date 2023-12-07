export interface JsonPatchItem {
    o: 'rm'|'add'|'set',
    p: string,
    v?: any,
    i?: number,
}

export type JsonPatch = JsonPatchItem[];
