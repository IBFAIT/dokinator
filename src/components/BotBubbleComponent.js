'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';
import BotSingleBubbleComponent from './BotSingleBubbleComponent.js';

let BotBubbleComponent = ({
      bot,
      index,
      bots,
      texts,
      name  = '',
      email = '',
      data  = '',
      classNameing = 'botbubble-component'
    }) => (
  <div className={classNameing}>
    <IconComponent
      name={bot.name}
      src={bot.avatar.src}
      alt={bot.avatar.alt}
    />
    <div className="botbubble-container">
      {
        texts.map((text, key) => {
          /* If there is more than one text, display random element */
          if(Array.isArray(text)) {
            const rand = Math.floor(Math.random()*text.length);
            bots[index].texts[key] = text[rand];
            text = text[rand];
          }
            return <BotSingleBubbleComponent {...{key, text, data, name, email}} />
        })
      }
    </div>
  </div>
);

BotBubbleComponent.displayName = 'BotBubbleComponent';

// Uncomment properties you need
// BotBubbleComponent.propTypes = {};
// BotBubbleComponent.defaultProps = {};

export default BotBubbleComponent;
