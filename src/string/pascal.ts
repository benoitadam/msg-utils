import { firstUpper } from './firstUpper';
import { words } from './words';

export const pascal = (arg: any): string => words(arg).map(firstUpper).join('');
