/**
 * @example
 * a b c - - - d - - e - -
 * - - - - c - - - d - - e
 */
export declare const debounce: <A = unknown>(fn: (value: A) => unknown, ms: number) => (value: A) => void;
