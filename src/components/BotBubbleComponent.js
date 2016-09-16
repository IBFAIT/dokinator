'use strict';

import React from 'react';

let BotBubbleComponent = ({bot, text, name, email, data}) => (
  <div className="botbubble-component">
    <div>
    <div className="icon">{bot.name} <img src={bot.src} /></div>
    <div className="text" data-botId={bot.id}>{eval('`'+text+'`')}</div>
    </div>
  </div>
);

BotBubbleComponent.displayName = 'BotBubbleComponent';

// Uncomment properties you need
// BotBubbleComponent.propTypes = {};
// BotBubbleComponent.defaultProps = {};

export default BotBubbleComponent;
