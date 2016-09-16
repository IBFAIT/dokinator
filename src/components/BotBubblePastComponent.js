'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';

let BotBubblePastComponent = ({bot, text}) => (
  <div className="botbubblepast-component">
    <div>
      <IconComponent name={bot.name} src={bot.avatar.src} alt={bot.avatar.alt} />
      <div className="text" data-botId={bot.id}>{eval('`'+text+'`')}</div>
    </div>
  </div>
);

BotBubblePastComponent.displayName = 'BotBubblePastComponent';

// Uncomment properties you need
// BotBubblePastComponent.propTypes = {};
// BotBubblePastComponent.defaultProps = {};

export default BotBubblePastComponent;
