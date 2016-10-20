'use strict';

import React from 'react';

import IconComponent      from './IconComponent.js';
import BotBubbleComponent from './BotBubbleComponent.js';

const BotPartComponent = ({
  texts,
  templateVars,
  botIdentity,
  style,
  className = 'botbubble-component',
  subClassNames = {
    bubbles: 'botbubble-container',
    bubbleComponent: 'botsinglebubble-component'
  }
}) => {
  const {id, name, avatar} = botIdentity;
  return (
    <div {...{className, style}}>
      <IconComponent {...{id, name, avatar}} />
      <div className={subClassNames.bubbles}>
        {mapBubbles({texts, templateVars, subClassNames})}
      </div>
    </div>
  );
}

const mapBubbles = ({texts, templateVars, subClassNames}) => (
  texts.map((text, key) => (
    <BotBubbleComponent key={key} {...{
      text,
      templateVars,
      className: subClassNames.bubbleComponent
    }} />
  ))
);

BotPartComponent.displayName = 'BotPartComponent';

export default BotPartComponent;
