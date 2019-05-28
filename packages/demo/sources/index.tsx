import '@gemini/core/sources/styles/index.less';

import * as gem              from '@gemini/core';
import {render}              from 'react-dom';
import {Helmet}              from 'react-helmet';
import {MdMenu, MdMoreHoriz} from 'react-icons/md';
import React                 from 'react';

// Defined as a constant via the Webpack configuration

declare var PUBLIC_PATH: string;

// Restore the path that might have been lost due to the 404 redirection on GitHub

const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;

if (typeof redirect !== `undefined` && redirect != location.href)
  history.replaceState(null, ``, redirect);

// Create a new element to hold our React application

const body = document.createElement(`div`);
document.body.appendChild(body);

// The real app goes here!

const Document = ({seed}: {seed: string}) => <>
  <div style={{margin: `0 1em`}}>
    <gem.Lipsum seed={seed} />
  </div>
</>;

const Foo = () => <>
  <Document seed={`foo`} />
</>;

const Bar = () => <>
  <Document seed={`bar`} />
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
    <gem.Tabs landingTab={`huey`} position={`bottom`}>
      <gem.Tab name={`huey`} title={`Huey`} component={Huey} />
      <gem.Tab name={`dewey`} title={`Dewey`} component={Dewey} />
      <gem.Tab name={`louie`} title={`Louie`} component={Louie} />
    </gem.Tabs>
  </>;
};

const Application = () => {
  return <>
    <Helmet>
      <meta name={`viewport`} content={`width=device-width, user-scalable=no`} />
    </Helmet>
    <gem.Page theme={`android`} baseUrl={PUBLIC_PATH}>
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
        <gem.Tab name={`foo`} title={`Foo`} component={Foo} />
        <gem.Tab name={`bar`} title={`Bar`} component={Bar} />
        <gem.Tab name={`baz`} title={`Baz`} component={Baz} />
      </gem.Tabs>
    </gem.Page>
  </>;
};

render(<Application/>, body);
