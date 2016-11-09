'use strict';

import React from 'react';


import Icon      from './Icon.js';
import BotBubble from './BotBubble.js';

const BotPart = ({ bot, templateVars, handleRandomBubble = null}) => {
  return (
    <div className="bot-part">
      <Icon id={bot.id} />
      <div className="bot-container-bubbles">
        {bot.texts.map((bubbleText, bubbleIndex) => {
          // if there is multiple bot texts, pick random
          if(handleRandomBubble) {
            bubbleText = (Array.isArray(bubbleText)) ? handleRandomBubble(bubbleText, bubbleIndex) : bubbleText;
          }
          return (
            <BotBubble
              key={bubbleIndex}
              bubbleText={bubbleText}
              templateVars={templateVars}
            />
          );
        })}
      </div>
    </div>
  );
}

BotPart.displayName = 'BotPart';

export default BotPart;
