import {useCallback, useContext} from 'react';

import {BreadcrumbContext}       from '../context';
import {NavigateContext}         from '../context';

export const useNavigate = () => {
  const breadcrumb = useContext(BreadcrumbContext);
  const navigate = useContext(NavigateContext);

  return useCallback((name: string | Array<string>, {strict = false}: {strict?: boolean} = {}) => {
    if (!Array.isArray(name))
      name = [name];

    if (!strict) {
      const [first, ...rest] = name as Array<string>;

      if (first === breadcrumb.consumed[breadcrumb.consumed.length - 1]) {
        if (rest.every((segment, index) => segment === breadcrumb.available[index])) {
          return;
        }
      }
    }
      
    navigate(breadcrumb.consumed.concat(name));
  }, [
    breadcrumb.consumed.join(`/`),
    navigate,
  ]);
};
