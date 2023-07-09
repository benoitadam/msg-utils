export default (value: any): value is Record<any, any> =>
  value instanceof Object && !Array.isArray(value);
