import React from 'react';

export type Props = {
  children: string;
};

export const Paragraphy = ({children}: Props) => {
  const lines = children.split(/(\r\n|\r|\n)/g);
  const filtered = lines.map(line => line.trim()).filter(line => line.length > 0);

  return <>
    {filtered.map((line, index) => <p key={index}>{line}</p>)}
  </>;
};
