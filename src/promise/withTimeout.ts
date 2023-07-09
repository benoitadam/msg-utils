import TimeoutError from './TimeoutError';

export default <T>(promise: Promise<T>, timeoutMs = 5000): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new TimeoutError()), timeoutMs);
    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(t));
  });
};
