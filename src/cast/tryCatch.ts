interface TryCatch {
  <T = any>(v: () => any): T | undefined;
  <T = any, U = any>(v: () => any, def: U): T | U;
}

export default ((fun: () => any, def: any): any => {
  try {
    return fun();
  } catch (error) {
    return def;
  }
}) as TryCatch;
