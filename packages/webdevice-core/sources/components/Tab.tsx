import React, {useCallback} from 'react';

export type Props = {
  component: any;
  name: string;
  title: string;
  onActivate?: (name: string) => void,
};

export const Tab = ({name, title, onActivate}: Props) => {
  const callback = useCallback(() => {
    onActivate && onActivate(name);
  }, [name, onActivate]);

  return <>
    <div className={`gem-tab`} onClick={callback}>
      <div className={`gem-tab-label`}>
        {title}
      </div>
    </div>
  </>;
};
