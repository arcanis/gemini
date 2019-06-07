import React  from 'react';

import {Card} from './Card';

export type Props = {
  children: React.ReactNode;
};

export const CardPlaceholder = ({children}: Props) => <>
  <Card>
    <div className={`gem-card-placeholder`}>
      {children}
    </div>
  </Card>
</>;
