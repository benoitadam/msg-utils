export default (value: number, decimal?: number) => {
  const x = Math.pow(10, decimal || 0);
  return Math.round(value * x) / x;
};
