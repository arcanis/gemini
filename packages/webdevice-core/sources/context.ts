import React from 'react';

export const BreadcrumbContext = React.createContext({
  available: [] as Array<string>,
  consumed: [] as Array<string>,
});

export const NavigateContext = React.createContext((segments: Array<string>): void => {
  throw new Error(`The useNavigate hook can only be called from within the Page component`);
});
