import getJson from '../json/getJson';
import valueBy from '../record/valueBy';

export default <T>(arr: T[]): T[] => Object.values(valueBy(arr, (v) => getJson(v)));
