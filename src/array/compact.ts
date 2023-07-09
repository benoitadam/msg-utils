/**
 * Creates an array with all falsy values removed.
 * @param items
 * @returns
 */
export default (value: any) => value.filter(Boolean) as (String | Number | Object | Date)[];
