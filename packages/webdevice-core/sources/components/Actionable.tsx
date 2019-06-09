import React               from 'react';

import {Action, useAction} from '../hooks/useAction';

export type Props = {
  children: React.ReactNode;
  onAction?: Action;
};

export const Actionable = ({children, onAction}: Props) => {
  return <>
    <a className={`gem-actionable`} onClick={useAction(onAction)}>
      {children}
    </a>
  </>;
};
