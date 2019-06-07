import React             from 'react';

import {Card}            from './Card';

import {MaybeReactArray} from '../props';

export type Props = {
  children: MaybeReactArray<typeof Card>;
  style?: React.CSSProperties;
};

export const CardContainer = ({children, style}: Props) => <>
  <div className={`gem-card-container`} style={style}>
    {children}
  </div>
</>;
