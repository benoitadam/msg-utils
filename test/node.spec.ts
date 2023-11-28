import { cmd, Cmd, parseJson } from '../src';

describe('node', () => {
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
