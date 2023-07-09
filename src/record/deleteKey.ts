export default <T>(record: Record<string, T>, ...keys: string[]): Record<string, T> => {
  for (const key of keys) delete record[key];
  return record;
};
