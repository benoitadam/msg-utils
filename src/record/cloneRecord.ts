type Writable<T> = { -readonly [P in keyof T]: T[P] };

export const cloneRecord = <T extends {} = any>(value: T | null | undefined): Writable<T> =>
  Object.assign({}, value);
