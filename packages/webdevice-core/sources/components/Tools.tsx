import React  from 'react';

import {Tool} from './Tool';

export type Props = {
  children: React.ReactElement<any, typeof Tool>;
  side: `primary` | `secondary`;
};

export const Tools = ({children, side}: Props) => <>
  <div className={`gem-tools gt-tools-${side}`}>
    {children}
  </div>
</>;
