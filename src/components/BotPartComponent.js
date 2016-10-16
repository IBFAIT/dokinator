'use strict';

import React from 'react';

// require('styles/BotPartComponent.scss');

import IconComponent      from './IconComponent.js';
import BotBubbleComponent from './BotBubbleComponent.js';

const BotPartComponent = ({texts, templateVars, botIdentity, className}) => {
  const {id, name, avatar} = botIdentity;
  return (
    <div {...{className}}>
      <IconComponent {...{id, name, avatar}} />
      <div className="subbubbles-container">
        {texts.map((text, key) =>
          (<BotBubbleComponent key={key} {...{
            text,
            templateVars,
            className: 'bot-bubble-component'
          }} />)
        )}
      </div>
    </div>
  );
}

BotPartComponent.displayName = 'BotPartComponent';

// Uncomment properties you need
// BotPartComponent.propTypes = {};
// BotPartComponent.defaultProps = {};

export default BotPartComponent;
