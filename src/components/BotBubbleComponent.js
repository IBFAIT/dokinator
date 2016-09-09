'use strict';

import React from 'react';

require('styles/BotBubble.scss');

let BotBubbleComponent = ({bot, text, name, email, data}) => (
  <div className="botbubble-component">
    <div>{bot.name} <img src={bot.src} /></div>
    <div>{eval('`'+text+'`')}</div>
  </div>
);

BotBubbleComponent.displayName = 'BotBubbleComponent';

// Uncomment properties you need
// BotBubbleComponent.propTypes = {};
// BotBubbleComponent.defaultProps = {};

export default BotBubbleComponent;
