import firstUpper from './firstUpper';
import words from './words';

export default (arg: any): string => words(arg).map(firstUpper).join('');
