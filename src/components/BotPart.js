'use strict';

import React from 'react';

import Icon      from './Icon.js';
import BotBubble from './BotBubble.js';

const BotPart = ({ texts, templateVars, botIdentity}) => {
  const {id, name, avatar} = botIdentity;
  return (
    <div className="bot-bubble">
      <Icon
        id={id}
        name={name}
        avatar={avatar}
      />
      <div className="bot-container-bubbles">
        {mapBubbles({texts, templateVars})}
      </div>
    </div>
  );
}

const mapBubbles = ({texts, templateVars}) => (
  texts.map((text, index) => (
    <BotBubble
      key={index}
      text={text}
      templateVars={templateVars}
    />
  ))
);

BotPart.displayName = 'BotPart';

export default BotPart;
