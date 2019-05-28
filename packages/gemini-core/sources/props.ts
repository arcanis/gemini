import React from 'react';

export type MaybeReactArray<T extends React.JSXElementConstructor<any>> = Array<React.ReactElement<any, T>> | React.ReactElement<any, T>;

export type ColorSet = `primary` | `secondary` | `light`;
export type Position = `top` | `bottom`;

export const getColorSet = (colorSet?: string) => {
  return colorSet != null ? colorSet : `primary`;
};

export const getPosition = (position?: string) => {
  return position != null ? position : `top`;
};

export const ensureArrayChildren = <T extends React.JSXElementConstructor<any>>(children: MaybeReactArray<T>): Array<React.ReactElement<any, T>> => {
  return Array.isArray(children) ? children : [children];
};
