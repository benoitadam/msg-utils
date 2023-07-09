import { useRef } from 'react';

export default <T>(fn: () => T): T => {
  const ref: any = useRef();
  return (ref.current || (ref.current = { v: fn() })).v;
};
