/**
 * Checks if the current runtime environment is Node.js.
 *
 * This function evaluates the presence of the global `process` object and specifically checks for the `node` property within `process.versions` to determine if the code is running in a Node.js environment. This is a common way to differentiate between Node.js and browser environments in JavaScript code.
 *
 * @returns {boolean} Returns `true` if the environment is Node.js, otherwise returns `false`.
 */
export declare const isNode: () => boolean;
