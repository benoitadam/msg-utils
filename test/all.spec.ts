import { VERSION } from '../src';

import './array.spec';
import './cast.spec';
import './check.spec';
import './json.spec';
import './number.spec';
import './msg.spec';
import './promise.spec';
import './record.spec';
import './rest.spec';
import './stored.spec';
import './string.spec';

describe('global', () => {
  test(`version`, () => {
    expect(VERSION).toBeDefined();
    expect(XMLHttpRequest).toBeDefined();
  });
});
