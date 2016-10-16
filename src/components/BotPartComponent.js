'use strict';

import React from 'react';

import IconComponent      from './IconComponent.js';
import BotBubbleComponent from './BotBubbleComponent.js';

const BotPartComponent = ({
  texts,
  templateVars,
  botIdentity,
  className = 'botbubble-component',
  subClassNames = {
    bubbles: 'botbubble-container',
    bubbleComponent: 'botsinglebubble-component'
  }
}) => {
  const {id, name, avatar} = botIdentity;
  return (
    <div {...{className}}>
      <IconComponent {...{id, name, avatar}} />
      <div className={subClassNames.bubbles}>
        {texts.map((text, key) =>
          (<BotBubbleComponent key={key} {...{
            text,
            templateVars,
            className: subClassNames.bubbleComponent
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
