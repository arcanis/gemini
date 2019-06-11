import React, {useCallback, useState} from 'react';

import {Action, useAction}            from '../hooks/useAction';

export type Props = {
  children: React.ReactNode;
  onAction?: Action;
};

export const Actionable = ({children, onAction}: Props) => {
  const action = useAction(onAction);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handler = useCallback(e => {
    const rect = e.target.getBoundingClientRect();

    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);

    action();
  }, [action]);

  return <>
    <div className={`gem-actionable`} style={{[`--gem-mouse-x`]: mouseX, [`--gem-mouse-y`]: mouseY} as any} onClick={handler} tabIndex={0}>
      {children}
    </div>
  </>;
};
