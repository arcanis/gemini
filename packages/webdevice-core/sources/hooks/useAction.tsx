import {useCallback, useRef} from 'react';

import {emptyFn}             from '../';

import {useMenu}             from './useMenu';

export type Action = (() => void) | `menu` | `exit` | `reload`;

const reload = () => window.location.reload();
const stop = () => window.stop();

export function useAction(action: Action | undefined) {
  const ref = useRef<() => void>(emptyFn);
  ref.current = useRealAction(action);

  return useCallback(() => {
    ref.current();
  }, []);
}

export function useRealAction(action: Action | undefined) {
  const openMenu = useMenu();

  switch (action) {
    case `reload`: {
      return reload;
    } break;

    case `exit`: {
      return stop;
    } break;

    case `menu`: {
      return openMenu;
    } break;

    case undefined: {
      return emptyFn;
    } break;

    default: {
      return action;
    } break;
  }
}
