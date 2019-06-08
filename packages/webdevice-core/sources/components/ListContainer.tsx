import React from 'react';

export type Props = {
  children: React.ReactNode;
};

export const ListContainer = ({children}: Props) => <>
  <div className={`gem-list-container`}>
    {children}
  </div>
</>;
