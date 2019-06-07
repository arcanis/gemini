import React from 'react';

export type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Card = ({children, style}: Props) => <>
  <div className={`gem-card`} style={style}>
    {children}
  </div>
</>;
