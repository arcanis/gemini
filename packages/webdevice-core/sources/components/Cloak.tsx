import React, {useContext} from 'react';

import {CloakContext}      from '../context';

export type Props = {
  children: React.ReactNode;
  status: boolean;
};

export const Cloak = ({children, status}: Props) => {
  const cloaked = useContext(CloakContext);

  return <>
    <CloakContext.Provider value={cloaked || status}>
      {children}
    </CloakContext.Provider>
  </>;
};
