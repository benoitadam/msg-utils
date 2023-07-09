export default (arg: string): string => (arg ? arg[0].toUpperCase() + arg.substring(1) : arg);
