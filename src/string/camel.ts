import { firstLower } from './firstLower';
import { pascal } from './pascal';

export const camel = (arg: string): string => firstLower(pascal(arg));
