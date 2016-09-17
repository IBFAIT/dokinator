'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';

let BotBubbleComponent = ({bot, text, name, email, data}) => (
  <div className="botbubble-component">
    <IconComponent name={bot.name} src={bot.avatar.src} alt={bot.avatar.alt} />
    <div className="bubble-inner">
      <div className="text" data-botId={bot.id}>{eval('`'+text+'`')}</div>
    </div>
  </div>
);

BotBubbleComponent.displayName = 'BotBubbleComponent';

// Uncomment properties you need
// BotBubbleComponent.propTypes = {};
// BotBubbleComponent.defaultProps = {};

export default BotBubbleComponent;
