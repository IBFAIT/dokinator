'use strict';

import React from 'react';

// Components
import Icon      from './Icon.js';
import BotBubble from './BotBubble.js';

// generic styles
import genStyl from '../styles/genStyl.js';

const Styl = {
  component: {...genStyl.botbubbleFlex, ...genStyl.bubbleMarginPadding},
  bubbleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '100%'
  }
}

const BotPart = ({ bot, templateVars, handleRandomBubble = null}) => {
  return (
    <div style={Styl.component}>
      <Icon id={bot.id} />
      <div style={Styl.bubbleContainer}>
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
