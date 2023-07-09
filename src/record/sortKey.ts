export default <T extends Record<any, any>>(record: T): T =>
  Object.fromEntries(Object.entries(record).sort((a, b) => a[0].localeCompare(b[0]))) as T;
