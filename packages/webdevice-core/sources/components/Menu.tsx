import React, {useContext, useLayoutEffect} from 'react';

import {CloakContext, MenuContext}          from '../context';

import {Actionable}                         from './Actionable';

export type Props = {
  children: React.ReactNode;
  name: string;
  actions: {[key: string]: React.ReactElement<any, typeof Actionable>};
};

export const Menu = ({actions, children, name}: Props) => {
  const cloaked = useContext(CloakContext);
  const {register, reset} = useContext(MenuContext);

  // We instruct React to trigger a new resolution when the node is added,
  // removed, when its name/actions are modified, or when it becomes cloaked
  // or uncloaked
  useLayoutEffect(() => {
    reset();
    return () => reset();
  }, [name, actions, cloaked]);

  // When a new resolution is triggered, the register function changes and all
  // the menus register themselves again
  useLayoutEffect(() => {
    !cloaked && register(name, actions);
  }, [register]);

  return <>
    {children}
  </>;
};
