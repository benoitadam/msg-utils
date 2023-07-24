import { Msg, sleep } from '../src';

describe('Msg', () => {
  test(`Msg set and on off`, () => {
    const o1 = new Msg(0);
    expect(o1.get()).toEqual(0);

    let a = -1;
    let b = -1;

    const aOff = o1.on((val) => (a = val));
    const bOff = o1.on((val) => (b = val));

    o1.set(1);
    expect(o1.val).toEqual(1);
    expect(a).toEqual(1);
    expect(b).toEqual(1);

    aOff();
    o1.set(2);
    expect(o1.get()).toEqual(2);
    expect(a).toEqual(1);
    expect(b).toEqual(2);

    bOff();
    o1.set(3);
    expect(o1.get()).toEqual(3);
    expect(a).toEqual(1);
    expect(b).toEqual(2);
  });

  test(`Msg next callback`, () => {
    const o1 = new Msg(0);
    expect(o1.val).toEqual(0);
    o1.next((v) => v + 1);
    expect(o1.val).toEqual(1);
  });

  test(`Msg toPromise`, async () => {
    const o1 = new Msg(0);

    let a = 1;
    o1.toPromise((val) => val === 3).then((val) => (a = val));

    expect(a).toEqual(1);

    o1.set(2);
    expect(a).toEqual(1);

    o1.set(3);
    const b = await o1.toPromise();
    expect(a).toEqual(3);
    expect(b).toEqual(3);
  });

  test(`Msg map`, async () => {
    const o1 = new Msg(0);
    const map = o1.map((v) => v + 1);
    let v = map.get();

    map.on((next) => (v = next));

    expect(map.get()).toEqual(1);
    expect(v).toEqual(1);

    o1.set(50);
    expect(map.get()).toEqual(51);
    expect(v).toEqual(51);
  });

  test(`Msg getter setter`, () => {
    const o1 = new Msg(0);
    const getVal = o1.get.bind(o1);
    const setVal = o1.set.bind(o1);

    setVal(1);
    expect(getVal()).toEqual(1);

    setVal.call(this, 2);
    expect(getVal.call(this)).toEqual(2);
  });

  test('Msg.get', () => {
    expect(Msg.get('a', 1)).toEqual(Msg.get('a', 2));
    expect(Msg.get('a', 1)).toEqual(Msg.get('a', 3));
    expect(Msg.get('b', 1)).not.toEqual(Msg.get('a', 2));
  });

  test(`debounce`, async () => {
    const m0 = new Msg(0);
    const m1 = m0.debounce(5);

    let last = -1;
    let lastEqual = false;
    let count = 0;

    m1.on((v) => {
      if (last === v) lastEqual = true;
      count++;
    });

    m0.set(1);
    expect(m1.get()).toEqual(0);

    await sleep(50);
    expect(m1.get()).toEqual(1);

    m0.set(2);
    m0.set(3);
    m0.set(4);
    expect(m1.get()).toEqual(1);

    await sleep(50);
    expect(m1.get()).toEqual(4);

    expect(lastEqual).toEqual(false);
    expect(count).toEqual(2);
  });

  test(`throttle`, async () => {
    const m0 = new Msg(0);
    const m1 = m0.throttle(5);

    let last = -1;
    let lastEqual = false;
    let count = 0;

    m1.on((v) => {
      if (last === v) lastEqual = true;
      count++;
    });

    m0.set(1);
    expect(m1.get()).toEqual(1);

    m0.set(2);
    expect(m1.get()).toEqual(1);

    await sleep(50);
    expect(m1.get()).toEqual(2);

    m0.set(3);
    m0.set(4);
    m0.set(5);
    expect(m1.get()).toEqual(3);

    await sleep(50);
    expect(m1.get()).toEqual(5);

    expect(lastEqual).toEqual(false);
    expect(count).toEqual(4);
  });
});
