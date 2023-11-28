/**
 * @example
 * a b c d - - - - e - f g - -
 * a - c - d - - - e - f - g - (2s)
 * a - - d - - - - e - - g - - (3s)
 * a - - - d - - - e - - - g - (4s)
 */
export declare const throttle: <A = unknown>(fn: (value: A) => unknown, ms: number) => (value: A) => void;
