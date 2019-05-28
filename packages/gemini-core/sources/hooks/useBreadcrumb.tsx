import React, {useContext, useMemo, useRef} from 'react';

import {BreadcrumbContext}          from '../context';

export const useBreadcrumb = (landing: string, subSegments: Array<string>) => {
  const breadcrumb = useContext(BreadcrumbContext);
  const history = useRef<Array<string>>([]);

  return useMemo(() => {
    let segment: string;
    let rest: Array<string>;

    if (breadcrumb.available.length === 0) {
      segment = landing;
      rest = [];
    } else {
      segment = breadcrumb.available[0];
      rest = breadcrumb.available.slice(1);

      if (!subSegments.includes(segment)) {
        console.log(segment, 'doesnt match', subSegments)
        segment = history.current[0];
        rest = history.current.slice(1);
      } else {
        history.current = breadcrumb.available;
      }
    }

    const applyBreadcrumb = (children: React.ReactNode) => <>
      <BreadcrumbContext.Provider value={{
        available: rest,
        consumed: breadcrumb.consumed.concat([segment]),
      }} children={children} />
    </>;

    return [segment, applyBreadcrumb, rest] as [string, (children: React.ReactElement) => React.ReactElement, Array<string>];
  }, [
    JSON.stringify(breadcrumb),
  ]);
};
