import {
  cmd,
  env,
  parseJson,
  toString,
  toBoolean,
  toNumber,
  toRecord,
  tryCatch,
  envNumber,
  envBoolean,
  envJson,
} from '../src';

describe('node', () => {
  test('env', () => {
    process.env.envString = 'titi';
    process.env.envNumber = '5';
    process.env.envBoolean = 'true';
    process.env.envJson = '{ "a":1 }';
    process.env.envNotNumber = 'b';
    process.env.envNotBoolean = 'a';
    process.env.envNotJson = '5';

    expect(env('envString')).toEqual('titi');
    expect(envNumber('envNumber')).toEqual(5);
    expect(envBoolean('envBoolean')).toEqual(true);
    expect(envJson('envJson')).toEqual({ a: 1 });

    try {
      env('envNotString');
      expect(1).toEqual(0);
    } catch (e) {}
    try {
      envNumber('envNotNumber');
      expect(1).toEqual(0);
    } catch (e) {}
    try {
      envBoolean('envNotBoolean');
      expect(1).toEqual(0);
    } catch (e) {}
    try {
      envJson('envNotJson');
      expect(1).toEqual(0);
    } catch (e) {}
  });

  test(`cmd`, async () => {
    const lsResult = await cmd('ls');
    const files = String(lsResult).split('\n');
    console.debug('lsResult', files);
    expect(files.length).toBeGreaterThan(2);
    expect(files).toContain('package.json');

    const catResult = await cmd('cat {name}.{ext}', { name: 'package', ext: 'json' });
    const packageValue = parseJson(String(catResult));
    expect(typeof packageValue).toBe('object');
    expect(typeof packageValue.name).toBe('string');
  });
});
