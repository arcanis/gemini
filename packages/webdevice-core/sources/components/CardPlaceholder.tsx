import React  from 'react';

import {Card} from './Card';

export type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const CardPlaceholder = ({children, style}: Props) => <>
  <Card style={style}>
    <div className={`gem-card-placeholder`}>
      {children}
    </div>
  </Card>
</>;
