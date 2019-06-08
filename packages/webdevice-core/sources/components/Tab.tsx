import React, {useCallback} from 'react';

import {Actionable}         from './Actionable';

export type Props = {
  component: any;
  name: string;
  title: string;
  onActivate?: (name: string) => void,
};

export const Tab = ({name, title, onActivate}: Props) => {
  const callback = useCallback(() => {
    onActivate && onActivate(name);
  }, [name, onActivate]);

  return <>
    <Actionable onAction={callback}>
      {title}
    </Actionable>
  </>;
};
