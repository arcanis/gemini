import React             from 'react';

import {Card}            from './Card';

import {MaybeReactArray} from '../props';

export type Props = {
  children: MaybeReactArray<typeof Card>;
};

export const CardContainer = ({children}: Props) => <>
  <div className={`gem-card-container`}>
    {children}
  </div>
</>;
