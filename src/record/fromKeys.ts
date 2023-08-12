import { fromEntries } from "./fromEntries";

export const fromKeys = (keys: string[]): Record<string, boolean> =>
    fromEntries(keys.map(k => [k, true]));