import { isFunction } from "../check/isFunction";

interface TryCatch {
  <T = any>(funOrVal: T|(() => T)): T | undefined;
  <T = any, U = any>(funOrVal: T|(() => T), catchOrVal: U|(() => U)): T | U;
}

export const tryCatch = ((funOrVal: () => any, catchOrVal: any): any => {
  try {
    return isFunction(funOrVal) ? funOrVal() : funOrVal;
  } catch (error) {
    return isFunction(catchOrVal) ? catchOrVal(error) : catchOrVal;
  }
}) as TryCatch;
