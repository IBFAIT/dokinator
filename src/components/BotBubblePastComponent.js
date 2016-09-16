'use strict';

import React from 'react';

let BotBubblePastComponent = ({bot, text}) => (
  <div className="botbubblepast-component">
    <div>
    <div className="icon">{bot.name} <img src={bot.src} /></div>
    <div className="text" data-botId={bot.id}>{eval('`'+text+'`')}</div>
    </div>
  </div>
);

BotBubblePastComponent.displayName = 'BotBubblePastComponent';

// Uncomment properties you need
// BotBubblePastComponent.propTypes = {};
// BotBubblePastComponent.defaultProps = {};

export default BotBubblePastComponent;
