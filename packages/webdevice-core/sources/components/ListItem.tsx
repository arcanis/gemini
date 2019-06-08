import React from 'react';

export type Props = {
  children: React.ReactNode;
};

export const ListItem = ({children}: Props) => <>
  <div className={`gem-list-item`}>
    {children}
  </div>
</>;
