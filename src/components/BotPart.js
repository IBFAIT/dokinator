'use strict';

import React from 'react';

import Icon      from './Icon.js';
import BotBubble from './BotBubble.js';

const BotPart = ({ texts, templateVars, botIdentity}) => {
  const {id, name, avatar} = botIdentity;
  return (
    <div className="botbubble-component">
      <Icon
        id={id}
        name={name}
        avatar={avatar}
      />
      <div className="botbubble-container">
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
