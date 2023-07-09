import getJson from '../json/getJson';
import setStored from '../stored/setStored';

export default (value: any): Promise<void> => {
  setStored('__clipboard', value);
  if (navigator && navigator.clipboard) {
    return navigator.clipboard.writeText(getJson(value, ''));
  }
  return Promise.resolve();
};
