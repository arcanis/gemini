import {useContext}  from 'react';

import {MenuContext} from '../context';

export function useMenu() {
  const {open} = useContext(MenuContext);

  return open;
}
