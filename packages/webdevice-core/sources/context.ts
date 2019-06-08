import React        from 'react';

import {Actionable} from './components/Actionable';

export const CloakContext = React.createContext(false);

export const BreadcrumbContext = React.createContext({
  available: [] as Array<string>,
  consumed: [] as Array<string>,
});

export const MenuContext = React.createContext({
  reset: (): void => {
    throw new Error(`The useMenu hook can only be called from within the Page component`);
  },
  register: (name: string, actions: {[key: string]: React.ReactElement<any, typeof Actionable>}): void => {
    throw new Error(`The useMenu hook can only be called from within the Page component`);
  },
  open: (): void => {
    throw new Error(`The useMenu hook can only be called from within the Page component`);
  },
});

export const NavigateContext = React.createContext({
  goTo: (segments: Array<string>): void => {
    throw new Error(`The useNavigate hook can only be called from within the Page component`);
  },
});
