import React from 'react';

export type Props = {
  children: React.ReactElement<any, any>;
};

export const Tool = ({children}: Props) => <>
  <div className={`gem-tool`}>
    {children}
  </div>
</>;
