import React           from 'react';

import {Actionable}    from './Actionable';
import {Header}        from './Header';
import {ListContainer} from './ListContainer';
import {ListItem}      from './ListItem';

export type Props = {
  definition: {[name: string]: {[key: string]: React.ReactElement<any, typeof Actionable>}};
  onClose: () => void;
  status: boolean;
};

export const PhysicalMenu = ({definition, onClose, status}: Props) => {
  return <>
    <div className={`gem-menu`} data-gem-status={status ? `1` : `0`} onClick={onClose}>
      <div className={`gem-menu-target`}>
        <div className={`gem-menu-panel`}>
          {Object.entries(definition).map(([name, fields]) => <React.Fragment key={name}>
            <Header colorSet={`primary`} title={name}/>
            <ListContainer>
              {Object.entries(fields).map(([key, component]) => <React.Fragment key={key}>
                <ListItem>
                  {component}
                </ListItem>
              </React.Fragment>)}
            </ListContainer>
          </React.Fragment>)}
        </div>
      </div>
    </div>
  </>;
};
