import React             from 'react';

import {MaybeReactArray} from '../props';

import {Actionable}      from './Actionable';

export type Props = {
  children: MaybeReactArray<typeof Actionable>;
  side: `primary` | `secondary`;
};

export const Tools = ({children, side}: Props) => <>
  <div className={`gem-tools gt-tools-${side}`}>
    {children}
  </div>
</>;
