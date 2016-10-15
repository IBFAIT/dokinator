'use strict';

import React from 'react';

import BotPartComponent   from './BotPartComponent.js';

const BotPartPastComponent = ({path, bots, templateVars, botIdentitys, className = 'botpartpast-component'}) => {
  return (
    <div {...{className}}>
      { renderBotPartsFromPast({bots, templateVars, botIdentitys, path}) }
    </div>
  );
}

const renderBotPartsFromPast = ({bots, templateVars, botIdentitys, path}) => {
  return bots.map(({id, texts}, bubbleKey) => {
    return (
      <BotPartComponent key={bubbleKey} {...{
        texts,
        key:  path, // because path has to be unique, use path
        index:        bubbleKey,
        className: 'botbubblepast-component',
        botIdentity:  botIdentitys[id],
        templateVars
      }} />
    );
  });
}

BotPartPastComponent.displayName = 'BotPartPastComponent';

export default BotPartPastComponent;
