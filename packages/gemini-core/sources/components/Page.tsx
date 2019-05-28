import React, {useEffect, useCallback, useState} from 'react';

import {BreadcrumbContext}                       from '../context';
import {NavigateContext}                         from '../context';

export type Props = {
  children: React.ReactNode;
  theme: string;
};

export const Page = ({children, theme}: Props) => {
  const makeBreadcrumb = (segments: Array<string>) => {
    return {available: segments, consumed: []};
  };

  const extractBreadcrumb = (pathname: string) => {
    if (pathname === `/`) {
      return makeBreadcrumb([]);
    } else {
      return makeBreadcrumb(pathname.slice(1).split(/\//g));
    }
  };

  const [breadcrumb, setBreadcrumb] = useState(() => {
    return extractBreadcrumb(document.location.pathname);
  });

  const navigate = useCallback((segments: Array<string>) => {
    window.history.pushState(null, ``, `/${segments.join(`/`)}`);
    setBreadcrumb(makeBreadcrumb(segments.slice()));
  }, []);

  useEffect(() => {
    const popevent = () => {
      setBreadcrumb(extractBreadcrumb(document.location.pathname));
    };

    window.addEventListener(`popstate`, popevent);

    return () => {
      window.removeEventListener(`popstate`, popevent);
    };
  });

  return <>
    <NavigateContext.Provider value={navigate}>
      <BreadcrumbContext.Provider value={breadcrumb}>
        <div className={`gem-page gem-theme-${theme}`}>
          {children}
        </div>
      </BreadcrumbContext.Provider>
    </NavigateContext.Provider>
  </>;
};
