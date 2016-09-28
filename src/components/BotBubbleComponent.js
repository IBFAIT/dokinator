'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';
import BotSingleBubbleComponent from './BotSingleBubbleComponent.js';

let BotBubbleComponent = ({
      bot,
      texts,
      name='',
      email='',
      data='',
      classNameing='botbubble-component'
    }) => (
  <div className={classNameing}>
    <IconComponent
      name={bot.name}
      src={bot.avatar.src}
      alt={bot.avatar.alt}
    />
    <div className="botbubble-container">
      {
        texts.map((text, key) =>
          (<BotSingleBubbleComponent key={key} text={text} data={data} />)
        )
      }
    </div>
  </div>
);

BotBubbleComponent.displayName = 'BotBubbleComponent';

// Uncomment properties you need
// BotBubbleComponent.propTypes = {};
// BotBubbleComponent.defaultProps = {};

export default BotBubbleComponent;
