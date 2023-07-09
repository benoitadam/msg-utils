import isArray from './isArray';

export default (value: any): boolean =>
  !value || (isArray(value) ? value : Object.keys(value)).length === 0;
