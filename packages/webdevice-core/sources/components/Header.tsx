import React         from 'react';

import {Tools}       from './Tools';
import {ColorSet}    from '../props';
import {getColorSet} from '../props';

export type Props = {
  children?: Array<React.ReactElement<any, typeof Tools>>;
  colorSet?: ColorSet;
  title: string;
};

export const Header = ({children, colorSet, title}: Props) => <>
  <div className={`gem-header gt-header-${getColorSet(colorSet)}`}>
    <div className={`gem-header-title`}>
      {title}
    </div>
    {children}
  </div>
</>;
