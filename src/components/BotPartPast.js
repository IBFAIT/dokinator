'use strict';

import React from 'react';

import BotPart   from './BotPart.js';

const BotPartPast = ({ bot, templateVars, botIdentitys, path }) => {
  return (
    <div className="bot-part-past">
      {bot.map(({id, texts}, bubbleIndex) => (<BotPart
        key={bubbleIndex}
        texts={texts}
        key={path}
        index={bubbleIndex}
        botIdentity={botIdentitys[id]}
        templateVars={templateVars}/>)
      )}
    </div>
  );
}

BotPartPast.displayName = 'BotPartPast';

export default BotPartPast;
