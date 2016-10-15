'use strict';

import React from 'react';

import IconComponent      from './IconComponent.js';
import BotBubbleComponent from './BotBubbleComponent.js';

const BotPartPastComponent = ({bot, texts, templateVars}) => {
  const {botName, botAvatar, botId} = bot;
  return (
    <div className="botbubble-component">
      <IconComponent {...{
        name: botName,
        botAvatar,
        botId
      }} />
        <div className="botbubble-container">
          {texts.map((text, key) =>
            (<BotBubbleComponent {...{
              key,
              text,
              templateVars
            }} />)
          )}
        </div>
    </div>
  );
}

BotPartPastComponent.displayName = 'BotPartPastComponent';

export default BotPartPastComponent;
