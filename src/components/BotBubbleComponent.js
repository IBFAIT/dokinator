'use strict';

import React from 'react';

require('styles/BotBubble.scss');

let BotBubbleComponent = ({bot, text, name, email, data}) => (
  <div className="botbubble-component">
    <div className="icon">{bot.name} <img src={bot.src} /></div>
    <div className="text">{eval('`'+text+'`')}</div>
  </div>
);

BotBubbleComponent.displayName = 'BotBubbleComponent';

// Uncomment properties you need
// BotBubbleComponent.propTypes = {};
// BotBubbleComponent.defaultProps = {};

export default BotBubbleComponent;
