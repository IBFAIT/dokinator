'use strict';
import React from 'react';

import Defaults from './defaults.json';

// Components
import Icon   from './Icon.js';
import Bubble from './Bubble.js';

const Styl = {
  component: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: '2rem',
    marginLeft: '0.4rem',
    marginRight: '0.4rem'
  },
  bubbleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '100%'
  }
}

const BotPart = ({bot, children}) => {
  return  (
    <div style={Styl.component}>
      <Icon name={bot.name} />
      <div style={Styl.bubbleContainer}>
        {children}
      </div>
    </div>
  );
}

BotPart.displayName = 'BotPart';

export default BotPart;
