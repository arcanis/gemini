import '@webdevice/core/sources/styles/index.less';
import 'pikasprite/build/spritesheet.css';

import * as gem                   from '@webdevice/core';
import {render}                   from 'react-dom';
import {Helmet}                   from 'react-helmet';
import {MdMenu, MdMoreHoriz}      from 'react-icons/md';
import AutoSizer                  from 'react-virtualized-auto-sizer';
import {VariableSizeList as List} from 'react-window';
import React                      from 'react';

import {query}                    from './database';

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

const TYPES_COLOR = new Map([
  [ `1`, `#A8A878`], // Normal
  [ `2`, `#C03028`], // Fighting
  [ `3`, `#A890F0`], // Flying
  [ `4`, `#A040A0`], // Poison
  [ `5`, `#E0C068`], // Ground
  [ `6`, `#B8A038`], // Rock
  [ `7`, `#A8B820`], // Bug
  [ `8`, `#705898`], // Ghost
  [ `9`, `#B8B8D0`], // Steel
  [`10`, `#F08030`], // Fire
  [`11`, `#6890F0`], // Water
  [`12`, `#78C850`], // Plant
  [`13`, `#F8D030`], // Electric
  [`14`, `#F85888`], // Psychic
  [`15`, `#98D8D8`], // Ice
  [`16`, `#7038F8`], // Dragon
  [`17`, `#705848`], // Dark
  [`18`, `#EE99AC`], // Fairy
]);

export const getColor = (typeString: string) => {
  const types = typeString.split(/,/);

  switch (types.length) {
    case 2: {
      return `linear-gradient(to bottom right, ${TYPES_COLOR.get(types[0])} 0%, ${TYPES_COLOR.get(types[0])} 49.99%, ${TYPES_COLOR.get(types[1])} 50%, ${TYPES_COLOR.get(types[1])} 100%)`;
    } break;

    case 1: {
      return `${TYPES_COLOR.get(types[0])}`;
    } break;
  }
};

const Pokedex = React.lazy(async () => {
  const res = await query(`
    SELECT id, name, GROUP_CONCAT(type_id)
    FROM pokemon_species
    LEFT JOIN pokemon_species_names ON id=pokemon_species_id
    LEFT JOIN pokemon_types ON id=pokemon_id
    WHERE local_language_id=9
    GROUP BY id
    ORDER BY CAST(id AS INTEGER)
  `);

  const Row = ({index, style}: any) => {
    if (index % 2 === 0)
      return <div style={style}/>;

    const [id, name, types] = res.values[index];

    return <>
      <div style={style}>
        <gem.Card style={{height: `100%`, margin: `0 10px`}}>
          <div style={{display: `flex`, alignItems: `center`, height: `100%`}}>
            <div style={{display: `inline-block`, marginRight: `1em`, borderRadius: 40, flex: `none`, padding: `5px 0`, background: getColor(types)}}>
              <i className={`pkspr-dex-${id.toString().padStart(4, 0)}-trimmed`} style={{verticalAlign: `middle`}}/>
            </div>
            <div>
              <h1>{name}</h1>
              <p>#{String(id).padStart(3, `0`)}</p>
            </div>
          </div>
        </gem.Card>
      </div>
    </>;
  };

  const itemCount = res.values.length * 2 + 1;

  const getItemSize = (index: number) => {
      if (index % 2 === 0) {
        return 10;
      } else {
        return 75;
      }
  };

  return {
    default: () => <>
      <AutoSizer>{({width, height}: any) => <>
        <List width={width} height={height} itemCount={itemCount} itemSize={getItemSize}>
          {Row}
        </List>
      </>}</AutoSizer>
    </>,
  };
});

const Fallback = () => <>
  <gem.CardPlaceholder style={{margin: `5px 0`}}>
    <div style={{height: `1em`}}/>
    <div style={{height: `1em`}}/>
  </gem.CardPlaceholder>
</>;

const Foo = () => <>
  <gem.CardContainer>
    <div style={{padding: `5px 0`}}>
      <React.Suspense fallback={<Fallback/>}>
        <Pokedex/>
      </React.Suspense>
    </div>
  </gem.CardContainer>
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
      <meta name={`mobile-web-app-capable`} content={`yes`} />
      <meta name={`apple-mobile-web-app-capable`} content={`yes`} />
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
