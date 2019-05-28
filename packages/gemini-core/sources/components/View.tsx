import React, {useCallback, useEffect, useRef, useState} from 'react';

export type Props = {
  children: React.ReactNode;
  className?: string;
  index?: number;
};

type ViewStore = Map<number, React.ReactNode>;
type ActiveViews = Map<number, ActiveView>;

type ActiveView = {
  cssIndex: number;
  timeout: number | null;
};

export const View = ({children, index = 0}: Props) => {
  const timeout = 400;

  const viewStore = useViewStore({children, index});
  const activeViews = useActiveViews(index, {timeout});

  const panels = [];

  for (const [index, children] of viewStore) {
    const activeView = activeViews.get(index);

    const style = typeof activeView !== `undefined`
      ? {[`--gem-view`]: activeView.cssIndex}
      : {display: `none`};

    panels.push(<React.Fragment key={index}>
      <div className={`gem-view-panel`} style={style as any}>
        {children}
      </div>
    </React.Fragment>);
  }

  const [activeView, setActiveView] = useState();

  // By using useEffect (which executes only after the render), we ensure that
  // the browser will correctly trigger the animation for any view that just
  // appeared (instead of skipping their transition and putting them directly
  // at their final location)
  useEffect(() => {
    setActiveView(activeViews.get(index)!.cssIndex);
  });

  return <>
    <div className={`gem-view`} style={{[`--gem-timeout`]: timeout, [`--gem-active`]: activeView} as any}>
      {panels}
    </div>
  </>;
};

function usePrevious(value: any) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

function useForceUpdate() {
  const [, setCount] = useState(0);

  return useCallback(() => {
    setCount(count => count + 1);
  }, []);
}

function useViewStore({children, index}: {children: React.ReactNode, index: number}): ViewStore {
  const viewStore = useRef(new Map([[index, children]]));

  viewStore.current.set(index, children);

  return viewStore.current;
}

function useActiveViews(index: number, {timeout}: {timeout: number}) {
  const activeViews = useRef(new Map([[index, {
    cssIndex: 0,
    timeout: null,
  }]]) as ActiveViews);

  const forceUpdate = useForceUpdate();
  const previousIndex = usePrevious(index);

  // If nothing changed we can shortcut the process. Note that this means we
  // can't make any hook call below this point, as that would cause different
  // hook flows in different circumstances (which is invalid)

  if (typeof previousIndex === `undefined` || index === previousIndex)
    return activeViews.current;

  // Makes sure we cancel the timeout if we move back to an already existing view

  {
    const view = activeViews.current.get(index);

    if (typeof view !== `undefined`) {
      const timeout = view.timeout;

      if (timeout !== null) {
        clearTimeout(timeout);
        view.timeout = null;
      }
    }
  }

  // Initializes the new view if it doesn't already exist

  {
    const view = activeViews.current.get(index);

    if (typeof view === `undefined`) {
      let nextCssIndex: number;

      if (index < previousIndex!)
        nextCssIndex = Math.min(... Array.from(activeViews.current.values()).map(view => view.cssIndex)) - 1;
      if (index > previousIndex!)
        nextCssIndex = Math.max(... Array.from(activeViews.current.values()).map(view => view.cssIndex)) + 1;

      activeViews.current.set(index, {
        cssIndex: nextCssIndex!,
        timeout: null,
      });
    }
  }

  // Initialize a timeout to remove the previous view
  //
  // We also reinitialize the timeout on all views between the previous one and
  // the new one (based on their cssIndex) because they mustn't disappear until
  // we've completely finished the transition.

  {
    const previousCssIndex = activeViews.current.get(previousIndex!)!.cssIndex;
    const viewCssIndex = activeViews.current.get(index)!.cssIndex;

    let inc = previousCssIndex < viewCssIndex ? +1 : -1;

    const reversedMap: Map<number, number> = new Map();

    for (const [index, {cssIndex}] of activeViews.current)
      reversedMap.set(cssIndex, index);

    for (let t = previousCssIndex; t != viewCssIndex; t += inc) {
      const zombieViewIndex = reversedMap.get(t);

      if (typeof zombieViewIndex === `undefined`)
        continue;

      const zombieView = activeViews.current.get(zombieViewIndex)!;

      zombieView.timeout = setTimeout(() => {
        activeViews.current.delete(zombieViewIndex);
        forceUpdate();
      }, timeout);
    }
  }

  return activeViews.current;
}
