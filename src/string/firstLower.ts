export default (arg: string): string => (arg ? arg[0].toLowerCase() + arg.substring(1) : arg);
