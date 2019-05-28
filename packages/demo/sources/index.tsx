import '@gemini/core/sources/styles/index.less';

import * as gem              from '@gemini/core';
import {render}              from 'react-dom';
import {MdMenu, MdMoreHoriz} from 'react-icons/md';
import React                 from 'react';

const body = document.createElement(`div`);
document.body.appendChild(body);

const Document = ({seed}: {seed: string}) => <>
  <div style={{margin: `0 1em`}}>
    <gem.Lipsum seed={seed} />
  </div>
</>;

const Foo = () => <>
  <Document seed={`foo`} />;
</>;

const Bar = () => <>
  <Document seed={`bar`} />;
</>;

const Huey = () => <>
  <Document seed={`huey`} />
</>;

const Dewey = () => <>
  <Document seed={`dewey`} />
</>;

const Louie = () => <>
  <Document seed={`louie`} />
</>;

const Baz = () => {
  return <>
    <gem.Tabs
      landingTab={`huey`}
      position={`bottom`}
    >
      <gem.Tab
        name={`huey`}
        title={`Huey`}
        component={Huey}
      />
      <gem.Tab
        name={`dewey`}
        title={`Dewey`}
        component={Dewey}
      />
      <gem.Tab
        name={`louie`}
        title={`Louie`}
        component={Louie}
      />
    </gem.Tabs>
  </>;
};

const Application = () => {
  return <>
    <gem.Page theme={`android`}>
      <gem.Header colorSet={`primary`} title={`Test`}>
        <gem.Tools side={`primary`}>
          <gem.Tool>
            <MdMenu />
          </gem.Tool>
        </gem.Tools>
        <gem.Tools side={`secondary`}>
          <gem.Tool>
            <MdMoreHoriz />
          </gem.Tool>
        </gem.Tools>
      </gem.Header>
      <gem.Tabs colorSet={`light`} position={`top`} landingTab={`foo`}>
        <gem.Tab
          name={`foo`}
          title={`Foo`}
          component={Foo}
        />
        <gem.Tab
          name={`bar`}
          title={`Bar`}
          component={Bar}
        />
        <gem.Tab
          name={`baz`}
          title={`Baz`}
          component={Baz}
        />
      </gem.Tabs>
    </gem.Page>
  </>;
};

render(<Application/>, body);
