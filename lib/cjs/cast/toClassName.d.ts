/**
 * Converts an object to its class name as a string.
 *
 * This function takes any object and returns its class name as a string. If the provided object is falsy (e.g., null or undefined),
 * it returns an empty string. If the object's constructor is a function and has a name, that name is returned. Otherwise,
 * the name of the object's constructor is returned. In cases where the object's constructor is an anonymous function,
 * 'Function' is returned as the class name.
 *
 * @param {any} obj - The object to be converted to its class name.
 * @returns {string} The class name of the object, or an empty string if the object is falsy.
 */
export declare const toClassName: (obj: any) => string;
