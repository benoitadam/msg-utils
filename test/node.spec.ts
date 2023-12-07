import { cmd, env, parseJson, toString, toBoolean, toNumber, toRecord, tryCatch } from '../src';

describe('node', () => {
  test('env', () => {
    process.env.envString = 'titi';
    process.env.envNumber = '5';
    process.env.envBoolean = 'true';
    process.env.envRecord = '{ a:1 }';
    process.env.envNotNumber = 'b';
    process.env.envNotBoolean = 'a';
    process.env.envNotRecord = '5';

    expect(env('envString', toString)).toEqual('toto');
    expect(env('envNumber', toNumber)).toEqual(5);
    expect(env('envBoolean', toBoolean)).toEqual(true);
    expect(env('envRecord', toRecord)).toEqual({ a:1 });

    const n = env('envNotNumber', toNumber);

    tryCatch(() => env('envNotNumber', toNumber), "error").toEqual("error");
    tryCatch(() => env('envNotBoolean', toBoolean), "error").toEqual("error");
    tryCatch(() => env('envNotRecord', toRecord), "error").toEqual("error");
    
    const nbr = env('envNotNumber', toNumber, 5);
    tryCatch(() => , "error").toEqual(5);
    tryCatch(() => env('envNotBoolean', toBoolean), "error").toEqual("error");
    tryCatch(() => env('envNotRecord', toRecord), "error").toEqual("error");
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
