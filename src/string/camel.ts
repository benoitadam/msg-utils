import firstLower from './firstLower';
import pascal from './pascal';

export default (arg: string): string => firstLower(pascal(arg));
