import {useRef} from 'react';

function shallowEqual(a: Array<any>, b: Array<any>) {
  if (a.length !== b.length)
    throw new Error(`Prop count changed`);

  for (let t = 0; t < a.length; ++t)
    if (a[t] !== b[t])
      return false;

  return true;
}

export function usePropReceive(cb: () => void, newProps: Array<any>) {
  const ref = useRef<Array<any> | null>(null);

  let previousProps = ref.current;
  ref.current = newProps;

  if (previousProps === null || !shallowEqual(previousProps, newProps)) {
    cb();
  }
}