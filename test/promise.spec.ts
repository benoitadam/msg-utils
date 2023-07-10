import { diff, debounce, retry, sleep, throttle, withTimeout } from '../src';

describe('promise', () => {
  debounce;

  test(`debounce`, async () => {
    let value = 0;
    let count = 0;

    const call = debounce((next: number) => {
      value = next;
      count++;
    }, 10);

    call(1);

    expect(value).toEqual(0);
    expect(count).toEqual(0);

    await sleep(50);

    expect(value).toEqual(1);
    expect(count).toEqual(1);

    call(2);

    expect(value).toEqual(1);
    expect(count).toEqual(1);

    call(3);
    call(4);

    await sleep(50);

    expect(value).toEqual(4);
    expect(count).toEqual(2);
  });

  test(`retry`, async () => {
    let i = 0;
    const v = await retry(async () => {
      i++;
      throw i;
    }, 5).catch((e) => e);
    expect(v).toEqual(5);
  });

  test(`sleep`, async () => {
    const t1 = Date.now();
    await sleep(50);
    expect(diff(Date.now() - t1, 50)).toBeLessThan(30);
    const t2 = Date.now();
    await sleep(100);
    expect(diff(Date.now() - t2, 100)).toBeLessThan(30);
  });

  test(`throttle`, async () => {
    let value = 0;
    let count = 0;

    const call = throttle((next: number) => {
      value = next;
      count++;
    }, 10);

    call(1);

    expect(value).toEqual(1);
    expect(count).toEqual(1);

    await sleep(50);

    expect(value).toEqual(1);
    expect(count).toEqual(1);

    call(2);

    expect(value).toEqual(2);
    expect(count).toEqual(2);

    call(3);
    call(4);

    expect(value).toEqual(2);
    expect(count).toEqual(2);

    await sleep(50);

    expect(value).toEqual(4);
  });

  test(`withTimeout`, async () => {
    const test1 = await withTimeout(
      sleep(50).then(() => true),
      100,
    ).catch(() => false);
    expect(test1).toBe(true);
    const test2 = await withTimeout(
      sleep(100).then(() => true),
      50,
    ).catch(() => false);
    expect(test2).toBe(false);
  });
});
