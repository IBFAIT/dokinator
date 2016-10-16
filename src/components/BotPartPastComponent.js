'use strict';

import React from 'react';

import BotPartComponent   from './BotPartComponent.js';

const BotPartPastComponent = ({
  className = 'botpartpast-component',
  ...props
}) => {
  return (
    <div {...{className}}>
      { renderBotPartsFromPast(props) }
    </div>
  );
}

const renderBotPartsFromPast = ({
  bots,
  templateVars,
  botIdentitys,
  path,
  subClassNames = {
    botPartComponent: 'botbubblepast-component'
  }
}) => {
  return bots.map(({id, texts}, bubbleKey) => {
    return (
      <BotPartComponent key={bubbleKey} {...{
        texts,
        key:  path, // because path has to be unique, use path
        index:        bubbleKey,
        className: subClassNames.botPartComponent,
        botIdentity:  botIdentitys[id],
        templateVars
      }} />
    );
  });
}

BotPartPastComponent.displayName = 'BotPartPastComponent';

export default BotPartPastComponent;
