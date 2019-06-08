import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState} from 'react';

import {Actionable}                                                        from '../components/Actionable';
import {PhysicalMenu}                                                      from '../components/PhysicalMenu';
import {BreadcrumbContext, MenuContext}                                    from '../context';
import {NavigateContext}                                                   from '../context';

export type Props = {
  baseUrl?: string;
  children: React.ReactNode;
  theme: string;
};

export const Page = ({children, ...rest}: Props) => <>
  <ThemePage {...rest}>
    <NavigationPage {...rest}>
      <MenuPage {...rest}>
        {children}
      </MenuPage>
    </NavigationPage>
  </ThemePage>
</>;

const ThemePage = ({theme, children}: Props) => {
  return <>
    <div className={`gem-page gem-theme-${theme}`}>
      {children}
    </div>
  </>;
}

const NavigationPage = ({baseUrl = `/`, children, theme}: Props) => {
  if (!baseUrl.endsWith(`/`))
    baseUrl = `${baseUrl}/`;

  const makeBreadcrumb = (segments: Array<string>) => {
    return {available: segments, consumed: []};
  };

  const extractBreadcrumb = (pathname: string) => {
    if (pathname === baseUrl) {
      return makeBreadcrumb([]);
    } else {
      return makeBreadcrumb(pathname.slice(baseUrl.length).split(/\//g));
    }
  };

  const [breadcrumbCtx, setBreadcrumbCtx] = useState(() => {
    return extractBreadcrumb(document.location.pathname);
  });

  const navigateCtx = useMemo(() => {
    return {
      goTo: (segments: Array<string>) => {
        window.history.pushState(null, ``, `${baseUrl}${segments.join(`/`)}`);
        setBreadcrumbCtx(makeBreadcrumb(segments.slice()));
      },
    };
  }, []);

  useEffect(() => {
    const popevent = () => {
      setBreadcrumbCtx(extractBreadcrumb(document.location.pathname));
    };

    window.addEventListener(`popstate`, popevent);

    return () => {
      window.removeEventListener(`popstate`, popevent);
    };
  });

  return <>
    <NavigateContext.Provider value={navigateCtx}>
      <BreadcrumbContext.Provider value={breadcrumbCtx}>
        {children}
      </BreadcrumbContext.Provider>
    </NavigateContext.Provider>
  </>;
};

const MenuPage = ({children}: Props) => {
  const [resolution, setResolution] = useState<{[name: string]: {[key: string]: React.ReactElement<any, typeof Actionable>}}>({});
  const [menuState, setMenuState] = useState({});
  const [status, setStatus] = useState(false);

  const reset = useCallback(() => {
    setResolution({});
  }, []);

  const register = useCallback((name: string, actions: {[key: string]: React.ReactElement<any, typeof Actionable>}) => {
    resolution[name] = Object.assign({}, resolution[name], actions);
  }, [resolution]);

  useLayoutEffect(() => {
    setMenuState(resolution);
  }, [resolution]);

  const open = useCallback(() => {
    setStatus(true);
  }, [setStatus]);

  const close = useCallback(() => {
    setStatus(false);
  }, [setStatus]);

  const menuCtx = useMemo(() => {
    return {reset, register, open};
  }, [reset, register, open]);

  return <>
    <MenuContext.Provider value={menuCtx}>
      <PhysicalMenu definition={menuState} onClose={close} status={status}/>
      {children}
    </MenuContext.Provider>
  </>;
};
