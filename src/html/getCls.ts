import { fromKeys } from '../record/fromKeys';
import { Cls } from './interfaces';

export const getCls = (el: Element): Cls => fromKeys(el.className.split(' '));
