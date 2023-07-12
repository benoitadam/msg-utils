/**
 * @example
 * a b c d - - - - e - f g - -
 * a - c - d - - - e - f - g - (2s)
 * a - - d - - - - e - - g - - (3s)
 * a - - - d - - - e - - - g - (4s)
 */
declare const _default: <A = unknown>(fn: (value: A) => unknown, ms: number) => (value: A) => void;
export default _default;
