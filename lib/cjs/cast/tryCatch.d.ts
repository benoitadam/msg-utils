interface TryCatch {
    <T = any>(funOrVal: T | (() => T)): T | undefined;
    <T = any, U = any>(funOrVal: T | (() => T), catchOrVal: U | (() => U)): T | U;
}
/**
 * Executes a function and handles any thrown errors.
 *
 * This function takes two arguments. The first is a function or a value (`funOrVal`). The function
 * attempts to execute `funOrVal` as a function. If `funOrVal` is not a function, it returns `funOrVal` directly.
 * If an error is thrown during execution, the second argument (`catchOrVal`) is used.
 * If `catchOrVal` is a function, it is called with the error object. Otherwise, `catchOrVal` is returned directly.
 *
 * @template T - The type of the value returned by the try block.
 * @param {() => T | T} funOrVal - The function to try or a value to return.
 * @param {Function | any} catchOrVal - The function to catch errors or a value to return in case of an error.
 * @returns {T | any} - The result of `funOrVal` or `catchOrVal`.
 */
export declare const tryCatch: TryCatch;
export {};
