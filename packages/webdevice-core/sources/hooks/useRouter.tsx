import React, {useContext, useMemo, useRef} from 'react';

import {BreadcrumbContext, NavigateContext} from '../context';

export function useRouter(routes: Array<string>, {defaultSegment}: {defaultSegment: string}) {
  if (routes.length === 0)
    throw new Error(`Assertion failed: The router must have at least one route`);
  if (!routes.includes(defaultSegment))
    throw new Error(`Assertion failed: The default segment must be a valid route`);

  const breadcrumbCtx = useContext(BreadcrumbContext);
  const navigateCtx = useContext(NavigateContext);

  const history = useRef<{
    available: Array<string>,
    consumed: Array<string>,
  } | null>(null);

  return useMemo(() => {
    let available = breadcrumbCtx.available;
    let consumed = breadcrumbCtx.consumed;

    if (available.length === 0) {
      available = [];
      consumed = [...consumed, defaultSegment];
    } else if (!routes.includes(available[0])) {
      if (history.current !== null && !routes.includes(history.current.consumed[history.current.consumed.length - 1])) {
        available = history.current.available;
        consumed = history.current.consumed;
      } else {
        available = [];
        consumed = [...consumed, defaultSegment];
      }
    } else {
      consumed = [...consumed, available[0]];
      available = available.slice(1);
    }

    history.current = {
      available,
      consumed,
    };

    const segment = consumed[consumed.length - 1];
    const fullPath = [segment, ... available];

    const navigate = (path: Array<string> | string) => {
      if (!Array.isArray(path))
        path = [path];

      if (path.length === 1 && path[0] === defaultSegment) {
        navigateCtx([]);
      } else {
        navigateCtx(path);
      }
    };

    const nextNavigate = (path: Array<string> | string) => {
      if (!Array.isArray(path))
        path = [path];

      navigate([segment, ... path]);
    };

    const applyRouter = (name: string, child: React.ReactNode) => {
      return <>
        <BreadcrumbContext.Provider value={history.current!}>
          <NavigateContext.Provider value={nextNavigate}>
            {child}
          </NavigateContext.Provider>
        </BreadcrumbContext.Provider>
      </>;
    };

    return {
      fullPath,
      segment,
      navigate,
      applyRouter,
    };
  }, [
    JSON.stringify(breadcrumbCtx),
    JSON.stringify(history.current),
    JSON.stringify(routes),
    defaultSegment,
  ]);
}
