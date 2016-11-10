'use strict';

import React from 'react';

// Components
import Icon      from './Icon.js';
import BotBubble from './BotBubble.js';

// generic styles
import genStyl from '../styles/genStyl.js';

const BotPart = ({ bot, templateVars, handleRandomBubble = null}) => {
  return (
    <div
      className="bot-part"
      style={{...genStyl.botbubbleFlex, ...genStyl.bubbleMarginPadding}}
    >
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
