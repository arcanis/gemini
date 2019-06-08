import {useCallback, useContext} from 'react';

import {BreadcrumbContext}       from '../context';
import {NavigateContext}         from '../context';

export const useNavigate = () => {
  const breadcrumbCtx = useContext(BreadcrumbContext);
  const navigateCtx = useContext(NavigateContext);

  return useCallback((name: string | Array<string>, {strict = false}: {strict?: boolean} = {}) => {
    if (!Array.isArray(name))
      name = [name];

    if (!strict) {
      const [first, ...rest] = name as Array<string>;

      if (first === breadcrumbCtx.consumed[breadcrumbCtx.consumed.length - 1]) {
        if (rest.every((segment, index) => segment === breadcrumbCtx.available[index])) {
          return;
        }
      }
    }
      
    navigateCtx.goTo(breadcrumbCtx.consumed.concat(name));
  }, [
    breadcrumbCtx.consumed.join(`/`),
    navigateCtx,
  ]);
};
