import styled                                          from '@emotion/styled';
import React, {useRef}                                 from 'react';

import {Tab}                                           from './Tab';
import {View}                                          from './View'

import {useRouter}                                     from '../hooks/useRouter';
import {ColorSet, MaybeReactArray, Position}           from '../props';
import {ensureArrayChildren, getColorSet, getPosition} from '../props';

export type Props = {
  children: MaybeReactArray<typeof Tab>;
  colorSet?: ColorSet;
  landingTab: string;
  position?: Position;
};

const Pointer: any = styled.div`
  display: ${(props: any) => {
    return props.index === -1
      ? `undefined`
      : undefined
    ;
  }};

  width: ${(props: any) => {
    return `${100 / props.count}%`;
  }};

  transform: translateX(${(props: any) => {
    return props.index !== -1
      ? `${props.index * 100}%`
      : `0%`
    ;
  }});
`;

export const Tabs = ({children, colorSet, landingTab, position}: Props) => {
  const allChildren = ensureArrayChildren(children);

  const {segment, fullPath, navigate, applyRouter} = useRouter(allChildren.map(child => child.props.name), {
    defaultSegment: landingTab,
  });

  const activeIndex = allChildren.findIndex(child => {
    return child.props.name === segment;
  });

  // We use this ref to keep track of which urls have been used as navigation
  // targets (this way if we switch between tabs we'll still come back to the
  // same one where we started)

  const tabHistory = useRef<Map<string, Array<string>>>(new Map());
  tabHistory.current.set(segment, fullPath);

  const onActivate = (name: string) => {
    const target = tabHistory.current.get(name);
    navigate(target || name);
  };

  const tabBar = <React.Fragment key={`tab-bar`}>
    <div className={`gem-tabs-bar`}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          onActivate,
        });
      })}
      <Pointer
        className={`gem-tabs-pointer`}
        count={allChildren.length}
        index={activeIndex}
      />
    </div>
  </React.Fragment>;

  const view = <React.Fragment key={`view`}>
    <View className={`gem-view`} index={activeIndex}>
      {applyRouter(segment, React.createElement(allChildren[activeIndex].props.component))}
    </View>
  </React.Fragment>;

  const content = getPosition(position) === `top`
    ? [tabBar, view]
    : [view, tabBar];

  return <>
    <div className={`gem-tabs gt-tabs-${getColorSet(colorSet)}`}>
      {content}
    </div>
  </>;
};
